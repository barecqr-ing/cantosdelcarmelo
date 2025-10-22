<?php
// Ruta al directorio donde están los audios
$dir = __DIR__ . '/cantosdelcarmelo/audios/misa';

// Función para obtener la fecha del próximo domingo
function proximoDomingo() {
    $hoy = new DateTime();
    $diasHastaDomingo = 7 - $hoy->format('w');
    if ($diasHastaDomingo == 0) {
        $diasHastaDomingo = 7; // Ya es domingo, tomar el próximo
    }
    $domingo = $hoy->add(new DateInterval("P{$diasHastaDomingo}D"));
    return $domingo->format('d \d\e F \d\e Y');
}

// Obtener lista de archivos de audio
$audios = [];
if (is_dir($dir)) {
    foreach (scandir($dir) as $archivo) {
        if (in_array(strtolower(pathinfo($archivo, PATHINFO_EXTENSION)), ['mp3', 'wav', 'ogg'])) {
            $audios[] = $archivo;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Misa - <?php echo proximoDomingo(); ?></title>
    <style>
        body { font-family: sans-serif; padding: 2rem; background: #f4f4f4; }
        h1 { color: #333; }
        audio { display: block; margin: 1rem 0; width: 100%; max-width: 600px; }
    </style>
</head>
<body>
    <h1>Misa - <?php echo proximoDomingo(); ?></h1>

    <?php if (count($audios) > 0): ?>
        <?php foreach ($audios as $audio): ?>
            <div>
                <p><?php echo htmlspecialchars($audio); ?></p>
                <audio controls>
                    <source src="cantosdelcarmelo/audios/misa/<?php echo rawurlencode($audio); ?>" type="audio/<?php echo pathinfo($audio, PATHINFO_EXTENSION); ?>">
                    Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>No hay canciones para la misa aún.</p>
    <?php endif; ?>
</body>
</html>

