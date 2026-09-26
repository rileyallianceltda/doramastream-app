<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Inicializa o Laravel para usar a mesma exata conexão de banco de dados do seu site
// Estamos em public/dramapvp/, então o vendor e bootstrap estão dois níveis acima
$autoload_path = __DIR__ . '/../../vendor/autoload.php';
$app_path = __DIR__ . '/../../bootstrap/app.php';

if (file_exists($autoload_path) && file_exists($app_path)) {
    require $autoload_path;
    $app = require_once $app_path;
    
    // Booting Laravel
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );
    
    $query = isset($_GET['q']) ? trim($_GET['q']) : '';
    
    try {
        $yearExpr = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite'
            ? \Illuminate\Support\Facades\DB::raw("strftime('%Y', created_at) as release_year")
            : \Illuminate\Support\Facades\DB::raw('YEAR(created_at) as release_year');

        if (!empty($query)) {
            $results = \App\Models\Serie::where('is_published', true)
                ->where('title', 'LIKE', '%' . $query . '%')
                ->select('id', 'title', 'cover_image', $yearExpr)
                ->limit(1)
                ->get();
        } else {
            // Puxa as 20 melhores/mais novas
            $results = \App\Models\Serie::where('is_published', true)
                ->select('id', 'title', 'cover_image', $yearExpr)
                ->orderByDesc('is_trending')
                ->orderByDesc('id')
                ->limit(20)
                ->get();
        }
        
        echo json_encode($results);
        exit;
    } catch (\Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
        exit;
    }
} else {
    echo json_encode(['error' => 'Laravel não encontrado: verifique o caminho do autoload ('.$autoload_path.')']);
    exit;
}
