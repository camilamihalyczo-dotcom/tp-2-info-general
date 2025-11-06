// --- Base de Datos de Obras (ACTUALIZADA con .jpg) ---
const worksDatabase = {
    
    'manifesto-1991': {
        title: "A Cyberfeminist Manifesto (1991)",
        format: "Valla publicitaria, póster, texto digital.",
        description: "Más que un texto, fue su primera gran obra de arte pública. Se exhibió como una valla publicitaria gigante (6x3 metros) en Sídney. Al sacarlo del espacio académico y ponerlo en la calle, transformaron la teoría feminista en un anuncio provocador e ineludible.",
        images: [
            { src: "../assets/img/gallery/work-manifesto-1.jpg", alt: "Manifiesto 1" },
            { src: "../assets/img/gallery/work-manifesto-2.jpg", alt: "Manifiesto 2" },
            { src: "../assets/img/gallery/work-manifesto-3.jpg", alt: "Manifiesto 3" },
            { src: "../assets/img/gallery/work-manifesto-4.jpg", alt: "Manifiesto 4" }
        ]
    },

    'all-new-gen': {
        title: "All New Gen (1993-1995)",
        format: "Videojuego interactivo (CD-ROM) e instalación.",
        description: "Esta es su obra interactiva más célebre. 'All New Gen' es un videojuego que parodia y subvierte los juegos de disparos ('shoot em up') de la época. En lugar de rescatar a una princesa, la misión es 'sabotear los bancos de datos del insidioso Big Daddy Mainframe'.",
        images: [
            { src: "../assets/img/gallery/work-all-new-gen-1.jpg", alt: "All New Gen 1" },
            { src: "../assets/img/gallery/work-all-new-gen-2.jpg", alt: "All New Gen 2" },
            { src: "../assets/img/gallery/work-all-new-gen-3.jpg", alt: "All New Gen 3" },
            { src: "../assets/img/gallery/work-all-new-gen-4.jpg", alt: "All New Gen 4" }
        ]
    },

    'dna-sluts': {
        title: 'Las "DNA Sluts" (1993)',
        format: "Personajes de videojuego / Light Boxes (cajas de luz).",
        description: "Son las heroínas ('sheroínas') del juego 'All New Gen'. Personajes como Patina de Panties, Dentata y la Princesa del Moco (Princess of Slime) son renegadas que asisten al jugador. Fueron presentadas también como obras de arte individuales en formato de caja de luz.",
        images: [
            { src: "../assets/img/gallery/work-dna-sluts-1.jpg", alt: "DNA Sluts 1" },
            { src: "../assets/img/gallery/work-dna-sluts-2.jpg", alt: "DNA Sluts 2" },
            { src: "../assets/img/gallery/work-dna-sluts-3.jpg", alt: "DNA Sluts 3" },
            { src: "../assets/img/gallery/work-dna-sluts-4.jpg", alt: "DNA Sluts 4" }
        ]
    },

    'infiltrate': {
        title: "INFILTRATE (1994)",
        format: "Lightbox (caja de luz).",
        description: "Una obra visual clave que muestra su estética glitch y su lenguaje de sabotaje. Esta pieza refuerza la idea central del colectivo: no solo observar el ciberespacio, sino infiltrarse en él para desestabilizarlo.",
        images: [
            { src: "../assets/img/gallery/work-infiltrate-1.jpg", alt: "INFILTRATE 1" },
            { src: "../assets/img/gallery/work-infiltrate-2.jpg", alt: "INFILTRATE 2" },
            { src: "../assets/img/gallery/work-infiltrate-3.jpg", alt: "INFILTRATE 3" },
            { src: "../assets/img/gallery/work-infiltrate-4.jpg", alt: "INFILTRATE 4" }
        ]
    },

    'bitch-mutant': {
        title: "Bitch Mutant Manifesto (1996)",
        format: "Texto digital / Obra sonora.",
        description: "Una continuación de su primer manifiesto. Este texto es aún más poético y caótico, describiendo a la red como 'la hija salvaje mutante y bastarda del gran papá mainframe'. Refuerza la identidad de VNS Matrix como agentes del 'accidente maligno que cayó en tu sistema mientras dormías'.",
        images: [
            { src: "../assets/img/gallery/work-bitch-mutant-1.jpg", alt: "Bitch Mutant Manifesto 1" },
            { src: "../assets/img/gallery/work-bitch-mutant-2.jpg", alt: "Bitch Mutant Manifesto 2" },
            { src: "../assets/img/gallery/work-bitch-mutant-3.jpg", alt: "Bitch Mutant Manifesto 3" },
            { src: "../assets/img/gallery/work-bitch-mutant-4.jpg", alt: "Bitch Mutant Manifesto 4" }
        ]
    },

    'bad-code': {
        title: "Bad Code (1996-1999)",
        format: "CD-ROM / Proyecto multimedia.",
        description: "Un proyecto posterior que continuó explorando los temas de 'All New Gen'. 'Bad Code' (Código Maligno) profundiza en la idea de que el código (informático, genético, moral) puede ser corrompido. La obra incluía imágenes 3D, animaciones y video.",
        images: [
            { src: "../assets/img/gallery/work-bad-code-1.jpg", alt: "Bad Code 1" },
            { src: "../assets/img/gallery/work-bad-code-2.jpg", alt: "Bad Code 2" },
            { src: "../assets/img/gallery/work-bad-code-3.jpg", alt: "Bad Code 3" },
            { src: "../assets/img/gallery/work-bad-code-4.jpg", alt: "Bad Code 4" }
        ]
    }
};


// --- Lógica del Cargador de Contenido (Sin cambios) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Obtener el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const workKey = urlParams.get('work'); // ej: 'all-new-gen'

    // 2. Encontrar los elementos del HTML
    const breadcrumb = document.getElementById('detail-breadcrumb');
    const titleEl = document.getElementById('detail-title');
    const formatEl = document.getElementById('detail-format');
    const descriptionEl = document.getElementById('detail-description');
    
    // --- LÓGICA DE GLIDE.JS ---
    const slidesContainer = document.getElementById('glide-slides'); 

    if (workKey && worksDatabase[workKey] && slidesContainer) {
        // 3. Si encontramos la obra...
        const workData = worksDatabase[workKey];

        // 4. "Rellenar" la info de texto
        document.title = `SYNTAX ERROR - [${workData.title}]`;
        breadcrumb.innerText = `[ CARGANDO LOG... /work=${workKey} ]`;
        titleEl.innerText = workData.title;
        formatEl.innerText = workData.format;
        descriptionEl.innerText = workData.description;

        // 5. "Rellenar" el slider
        let slidesHTML = ''; // Variable para guardar el HTML de los slides
        workData.images.forEach(image => {
            slidesHTML += `
                <li class="glide__slide bg-black">
                    <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-contain">
                </li>
            `;
        });
        slidesContainer.innerHTML = slidesHTML; // Inyectamos el HTML en la <ul>

        // 6. "Encender" Glide.js (¡IMPORTANTE!)
        new Glide('.glide', {
            type: 'carousel', // Tipo slider
            startAt: 0,
            perView: 1,       // 1 imagen a la vez
            autoplay: 3500,   // Efecto de movimiento
            hoverpause: true, // Pausa al pasar el mouse
            gap: 0
        }).mount();

    } else {
        // 7. Si hay un error...
        document.title = "SYNTAX ERROR - [ERROR]";
        breadcrumb.innerText = "[ ERROR DE LECTURA ]";
        titleEl.innerText = "[ ARCHIVO NO ENCONTRADO ]";
        descriptionEl.innerText = "El log de esta obra no se ha encontrado en la base de datos. Por favor, vuelva a la galería.";
        if (slidesContainer) {
            slidesContainer.closest('.glide').style.display = 'none'; // Oculta el slider si hay error
        }
    }
});
