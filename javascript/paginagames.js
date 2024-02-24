//api de juegos gratis, tipo catalogo.
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
        headers: {
            'X-RapidAPI-Key': '6eba9b956emshefe2608f997f2c6p1fd354jsn2ce5176f51cb', // key de la api
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com', // host de la api
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const juegosLimitados = data.slice(0, 10);
                const swiperWrapper = document.querySelector('.swiper-wrapper');

                juegosLimitados.forEach(juego => {
                    const nombre = juego.title;
                    const descripcion = juego.short_description;
                    const plataforma = juego.platform;
                    const imagenURL = juego.thumbnail;
                    const enlace = obtenerEnlaceJuego(nombre);

                    // crear un nuevo slide
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');

                    const juegoElement = document.createElement('div');
                    juegoElement.classList.add('juego-slide-content'); // Clase adicional para el contenido
                    
                    const enlaceJuego = document.createElement('a');
                    enlaceJuego.href = enlace;
                    enlaceJuego.target = '_blank';
                    enlaceJuego.style.textDecoration = 'none';

                    const imagen = document.createElement('img');
                    imagen.src = imagenURL;
                    imagen.alt = nombre;
                    imagen.style.borderRadius = '20px';

                    const titulo = document.createElement('h3');
                    titulo.textContent = nombre;

                    const desc = document.createElement('p');
                    desc.textContent = descripcion;

                    const plat = document.createElement('p');
                    plat.textContent = `Plataforma: ${plataforma}`;

                    enlaceJuego.appendChild(imagen);
                    juegoElement.appendChild(enlaceJuego);
                    juegoElement.appendChild(titulo);
                    juegoElement.appendChild(desc);
                    juegoElement.appendChild(plat);

                    // poner el contenido en el slide
                    slide.appendChild(juegoElement);

                    // poner el slide en el contenedor swiper
                    swiperWrapper.appendChild(slide);
                });

                
                const swiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                        delay: 5000, // 5 segundos para que pasen los slides automaticamente
                    },
                });

                // agregar eventos a los botones personalizados
                const nextButton = document.querySelector('.swiper-button-next-custom');
                const prevButton = document.querySelector('.swiper-button-prev-custom');

                nextButton.addEventListener('click', () => {
                    swiper.slideNext();
                });

                prevButton.addEventListener('click', () => {
                    swiper.slidePrev();
                });
            } else {
                console.log('No se encontraron juegos gratuitos.');
            }
        })
        .catch(error => console.log(error));
    
    //enlaces de los juegos gratis

    function obtenerEnlaceJuego(nombre) {
        switch (nombre) {
            case 'Overwatch 2':
                return 'https://overwatch.blizzard.com/es-es/';
            case 'Diablo Immortal':
                return 'https://diabloimmortal.blizzard.com/es-es/';
            case 'Lost Ark':
                return 'https://www.playlostark.com/es-es/';
            case 'PUBG: BATTLEGROUNDS':
                return 'https://pubg.com/';
            case 'Enlisted':
                return 'https://enlisted.net/';
            case 'Forge of Empires':
                return 'https://es0.forgeofempires.com/page/media/testmediagroup/testmediagallery/';
            case 'Drakensang Online':
                return 'https://store.steampowered.com/app/2067850/Drakensang_Online/?l=latam';
            case 'MultiVersus':
                return 'https://multiversus.com/es-es';
            case 'Genshin Impact':
                return 'https://genshin.hoyoverse.com/es/';
            case 'Fall Guys':
                return 'https://www.fallguys.com/';
        }
    }
});
