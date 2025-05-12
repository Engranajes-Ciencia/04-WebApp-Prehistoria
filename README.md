# 🦖 Museo de la Prehistoria

**Museo de la Prehistoria** es una aplicación web interactiva desarrollada con React y Vite. Permite a los visitantes explorar un mapa del museo, acceder a juegos educativos mediante el escaneo de códigos QR y obtener información sobre las diferentes zonas y especies prehistóricas de forma intuitiva y visual.

---

## 🧭 Tabla de Contenidos

- [📷 Capturas de pantalla](#-capturas-de-pantalla)

    En esta sección se adjunta una serie de imágenes sobre el contenido del Parque.
    A continuación se hace referencia a cada parada (y su actividad correspondiente):
    *Parada 1 : 

    *Parada 2 : 
    *Parada 3 : 
    *Parada 4 : 
    *Parada 5 : 
    *Parada 6 : 
    *Parada 7 : 
    *Parada 8 : 
    *Parada 9 : 
    *Parada 10 : 
    *Parada 11: 
    *Parada 12 : 
    *Parada 13 : 
    *Parada 14 : 
    *Parada 15 : 
    *Parada 16 : 
    *Parada 17 : 
    *Parada 18 : 
    *Parada 19 : 
    *Parada 20 : 
    
- [🛠️ Tecnologías utilizadas](#-tecnologías-utilizadas)

    La aplicación web desarrollada para el Parque de la Prehistoria ha sido construida utilizando las siguientes tecnologías y herramientas:

        🔹 React.js
        Framework de JavaScript utilizado para construir toda la interfaz web de la aplicación. React permite una navegación fluida entre las distintas secciones del parque y gestiona la lógica necesaria para mostrar la información de las paradas, las actividades y el sistema de recompensas.

        🔹 Genially
        Herramienta externa empleada para la creación de juegos interactivos y actividades educativas.

        En el parque hay un total de 20 paradas:

        10 paradas ofrecen actividades interactivas desarrolladas en Genially.

        10 paradas cuentan únicamente con una audio guía.

        Todas las actividades también incluyen la opción de escuchar una guía en audio.

        Los usuarios acceden a estas actividades escaneando códigos QR distribuidos a lo largo del recorrido.

        🔹 Sistema de medallas y recompensas
        Al completar cada actividad en el recorrido, el usuario obtiene una medalla digital que se guarda automáticamente en su vitrina virtual.
        Al finalizar el recorrido, la aplicación muestra:

        Un resumen con todas las medallas recogidas.

        Dos diplomas personalizables (modo infantil y modo adulto), generados automáticamente con el nombre del usuario.

        🔹 jsPDF
        Biblioteca JavaScript utilizada para generar y firmar automáticamente los diplomas en PDF según el nombre introducido al comienzo del recorrido. Esto permite a los visitantes descargar y conservar su diploma como recuerdo de la experiencia.


- [🚀 Instalación y ejecución](#-instalación-y-ejecución)
            🔧 Requisitos previos
        Para poder ejecutar el proyecto en local, necesitas tener instalado en tu ordenador:

        *Node.js (versión recomendada: 18 o superior)

        *npm (gestor de paquetes que se instala con Node.js)

        *Git (para clonar el repositorio desde GitHub)

        *Editor de código recomendado: Visual Studio Code

            📥 Clonación del repositorio

        *Cada desarrollador debe seguir estos pasos para obtener el proyecto en su equipo:

        
        git clone https://github.com/usuario/nombre-del-repositorio.git

        Luego, entra en la carpeta del proyecto:

        
        cd nombre-del-repositorio

            📦 Instalación de dependencias
        Una vez dentro del proyecto, instala las dependencias necesarias con el siguiente comando:

       
        npm install

            ▶️ Ejecución del proyecto
        Para iniciar la aplicación en modo desarrollo:

        
        npm run dev


        ⚠️ Nota: El puerto puede variar si usas Vite o alguna otra herramienta. Ajusta según el caso.


- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [⚙️ Funcionamiento](#️-funcionamiento)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)
- [🎙️ Información sobre audios](#-audios)
    
    En esta sección se añade detalladamente los textos a voz de cada parada:

    1) PARADA 1 TRILOBITES 
    "Bienvenido a tu primera parada. Aquí descubrirás datos asombrosos sobre cómo vivieron los trilobites. Fueron animales marinos que habitaron los océanos hace unos quinientos millones de años."

    2) PARADA 2 DINOSAURIOS 
    "Bienvenido a tu segunda parada. Hoy conocerás a los dinosaurios, los gigantes que gobernaron la Tierra durante millones de años. Desde depredadores imponentes hasta pacíficos herbívoros, descubre cómo vivían y por qué desaparecieron."

    3) PARADA 3 TORTUGAS DE LAS GALÁPAGOS 
    "Bienvenido a tu tercera parada. Aquí descubrirás a las increíbles tortugas de las Galápagos, famosas por su longevidad y tamaño impresionante. Estas majestuosas criaturas han sobrevivido por siglos en un ecosistema único, adaptándose a las condiciones extremas de las islas. Observa cómo se mueven lentamente, pero con gran determinación, recorriendo su hogar volcánico."

    4) PARADA 4 HUELLAS DE LAETOLI
    "Bienvenido a tu cuarta parada. Aquí descubrirás las huellas de Laetoli, una evidencia clave de los primeros pasos de nuestros ancestros hace más de tres millones y medio de años. Estas huellas fosilizadas revelan cómo los homínidos caminaban erguidos, marcando un hito en la evolución humana. Observa su forma y disposición, testigos silenciosos de un pasado lejano."

    5) PARADA 5 PINTURAS RUPESTRES 
    "Bienvenido a tu quinta parada. Aquí explorarás las pinturas rupestres, un testimonio visual de las primeras expresiones artísticas de la humanidad. Con trazos simples, pero llenos de significado, nuestros antepasados plasmaban escenas de caza, rituales y vida cotidiana en las paredes de cuevas. Estas obras, creadas hace miles de años, nos conectan con sus pensamientos y creencias."

    6) PARADA 6 POBLADO NÓMADA
    "Bienvenido a tu sexta parada. Hoy viajarás al corazón de la vida nómada, donde las antiguas comunidades se desplazaban en busca de recursos y refugio. Sin asentamientos fijos, su supervivencia dependía de la caza, la recolección y el conocimiento del entorno. Descubre cómo construían sus refugios, se organizaban y transmitían sus tradiciones a través de generaciones."

    7) PARADA 7 POBLADO SEDENTARIO
    "Bienvenido a tu séptima parada. Aquí explorarás el poblado sedentario, donde las comunidades humanas comenzaron a establecerse de forma permanente. Gracias a la agricultura y la domesticación de animales, dejaron atrás la vida nómada y construyeron aldeas con viviendas más resistentes. Descubre cómo evolucionaron sus estructuras, su organización social y las primeras formas de comercio."

    8) PARADA 8 POZO PREHISTÓRICO
    "Bienvenido a tu octava parada. Aquí descubrirás el pozo prehistórico, una estructura clave para la supervivencia de las antiguas comunidades. Estos pozos eran utilizados para almacenar agua, un recurso vital en tiempos donde su acceso no siempre era fácil. Observa cómo fueron construidos y cómo jugaron un papel clave en la evolucion de asentamientos humanos"

    9) PARADA 9 STONEHENGE
    "Bienvenido a tu novena parada. Aquí te encontrarás con Stonehenge, uno de los monumentos más enigmáticos de la prehistoria. Construido hace miles de años, su propósito sigue siendo un misterio. Algunos creen que era un observatorio astronómico. Otros lo ven como un lugar sagrado para rituales. Admira la disposición perfecta de sus enormes piedras y deja que su historia te envuelva."

    10) PARADA 10 TEMPLO DE KARNAK 
    "Bienvenido a tu décima y última parada. Has llegado al templo de Karnak, uno de los complejos religiosos más impresionantes del Antiguo Egipto. Construido a lo largo de más de dos mil años, este templo era un lugar de adoración dedicado a los dioses y faraones. Sus enormes columnas y relieves cuentan historias de batallas, rituales y ofrendas. Observa su grandiosidad y siente el poder de una civilización que dejó una huella imborrable en la historia."


---


