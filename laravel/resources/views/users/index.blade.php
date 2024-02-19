<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>
<body>
    @section('content')
    <!-- Contenedor para el componente de React -->
    <div id="react-app"></div>

    <!-- Agrega estos enlaces a los archivos compilados de React -->
    <script src="{{ mix('js/app.js') }}" defer></script>

    <!-- Script para montar el componente de React -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Monta el componente en el contenedor con el id "react-app"
            const reactAppContainer = document.getElementById('react-app');
            ReactDOM.render(<TuComponenteReact />, reactAppContainer);
        });
    </script>
@endsection

</body>
</html>