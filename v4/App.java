package com.olympicsmedals;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.regex.Pattern;

@WebServlet("/submit")
public class App extends HttpServlet {

    private static final Pattern VALID_COUNTRY_PATTERN = Pattern.compile("^[a-zA-Z\\s]+$");

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String country = request.getParameter("country");
        String goldStr = request.getParameter("gold");
        String silverStr = request.getParameter("silver");
        String bronzeStr = request.getParameter("bronze");

        if (!isValidCountry(country)) {
            response.getWriter().println("El nombre del país no es válido. No debe contener números.");
            return;
        }

        int gold, silver, bronze;
        try {
            gold = Integer.parseInt(goldStr);
            silver = Integer.parseInt(silverStr);
            bronze = Integer.parseInt(bronzeStr);

            if (gold < 0 || silver < 0 || bronze < 0) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException e) {
            response.getWriter().println("Las cantidades deben ser números enteros no negativos.");
            return;
        }

        try (Connection conn = DatabaseManager.getConnection()) {
            String sql = "INSERT INTO medals (country, medal, quantity) VALUES (?, ?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                // Insertar medallas de oro
                pstmt.setString(1, country);
                pstmt.setString(2, "gold");
                pstmt.setInt(3, gold);
                pstmt.executeUpdate();

                // Insertar medallas de plata
                pstmt.setString(2, "silver");
                pstmt.setInt(3, silver);
                pstmt.executeUpdate();

                // Insertar medallas de bronce
                pstmt.setString(2, "bronze");
                pstmt.setInt(3, bronze);
                pstmt.executeUpdate();
            }
            response.getWriter().println("Medallas registradas exitosamente.");
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Error al registrar las medallas.");
        }
    }

    private boolean isValidCountry(String country) {
        return country != null && VALID_COUNTRY_PATTERN.matcher(country).matches();
    }
}
