<?php
$serverName = "localhost"; // o el nombre de tu servidor SQL Server
$connectionOptions = array(
    "Database" => "OlympicMedals", // Nombre de la base de datos
    "Uid" => "your_username", // Tu usuario de SQL Server
    "PWD" => "your_password"  // Tu contraseña de SQL Server
);

// Establecer la conexión
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$country = $_POST['country'];
$gold = $_POST['gold'];
$silver = $_POST['silver'];
$bronze = $_POST['bronze'];

// Preparar y ejecutar la consulta
$sql = "INSERT INTO Medals (Country, Gold, Silver, Bronze) VALUES (?, ?, ?, ?)";
$params = array($country, $gold, $silver, $bronze);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
} else {
    echo "Registro exitoso";
}

// Cerrar la conexión
sqlsrv_close($conn);
?>
