🎯 Proyecto GolGana – Plataforma de Reservas Deportivas

Repositorio: https://github.com/gabimac03/DespliegueGolGana2
Sitio en producción: https://golgana.ar/
Sitio de desarrollo: https://dev.golgana.ar/
👥 Integrantes

    Emiliano Rodríguez

    Enzo Miretti

    Gabriel Maccoco

    Martín López

    Leonel Valdivia

Materia: Computación en la Nube
Profesor: Pablo Vargas / Daniel Salazar
Año: 2025
🚀 Descripción general

GolGana es una plataforma web moderna para gestionar reservas de canchas deportivas. Nació como respuesta a la dificultad de encontrar predios disponibles y permite a los usuarios:

    Ver predios activos en tiempo real

    Consultar disponibilidad

    Reservar directamente desde el navegador

    Acceder desde cualquier dispositivo

Está desarrollada con tecnologías full stack modernas y desplegada en la nube mediante Kubernetes y GitHub Actions con CI/CD.
🎯 Objetivo

Resolver la problemática de disponibilidad y reserva de espacios deportivos en tiempo real, con geolocalización y una interfaz ágil.
El sistema fue diseñado para ser:

    Escalable

    Seguro

    Automatizado (CI/CD)

    Accesible públicamente vía Google Cloud

🛠️ Tecnologías utilizadas
Categoría	Tecnología
Frontend	React + Vite
Backend	Node.js + Express
Base de Datos	MySQL
Contenedores	Docker + DockerHub
Orquestador	Kubernetes (Google GKE)
CI/CD	GitHub Actions
Hosting	Google Cloud Ingress + Load Balancer
Certificados SSL	Google Managed Certificate (solo en prod)
DNS	golgana.ar y dev.golgana.ar
📁 Estructura de manifiestos (carpeta appdemo/k8s-manifests/)

    00-namespace/

        namespacedev.yaml

        namespaceprod.yaml

    01-configmap/

        configmap-db.yaml

    02-secrets/

        secret-db.yaml

    03-pvc/

        pvc.yaml

    04-service/

        service-db.yaml

        backend-service.yaml

        frontend-service.yaml

    05-deploys/

        deployment-db.yaml

        backend-deployment.yaml

        frontend-deployment.yaml

    06-ingress/

        ingress.yaml

    Cronjob/
        mysql-backup-cronjob.yaml

🗂️ Entornos y dominios
Entorno	Namespace	Dominio	Imagen Docker	Certificado TLS
Dev	dev	dev.golgana.ar	:dev	❌ No
Prod	prod	golgana.ar	:latest	✅ Sí (Managed)


🔁 Flujo de trabajo Git + CI/CD
🧱 Estructura de ramas

    main → renombrada a prod (rama protegida)

    dev → rama intermedia para pruebas

    feature/* → ramas temporales por funcionalidad

🔁 Flujo paso a paso

    Crear rama de desarrollo

git checkout dev
git pull origin dev
git checkout -b feature/nueva-funcionalidad

    Realizar cambios localmente
    → (opcional) Probar con Minikube
    → Commit y push:

git add .
git commit -m "Cambios en Home"
git push --set-upstream origin feature/nueva-funcionalidad

    Crear un Pull Request a dev
    🔄 GitHub Actions CI ejecuta:

        Build frontend y backend

        Push a DockerHub con tag :dev

    Merge a dev

        Dev se despliega automáticamente en namespace dev de GKE

    Crear Pull Request dev → prod

        Requiere aprobación manual por el equipo

        GitHub Actions CD ejecuta:

            Build de imágenes con tag :latest

            Push a DockerHub

            kubectl apply de manifiestos en GKE

🔐 Seguridad y buenas prácticas

    Secrets seguros en GitHub (GCP_SA_KEY, DOCKERHUB_TOKEN)

    Certificado TLS administrado por Google en prod

    Uso de Ingress + ClusterIP para evitar exposiciones innecesarias

    prod es una rama protegida (merge solo por reviewers autorizados)

🔄 Automatización y pruebas avanzadas

✅ Implementado:

    Deploy automático a dev/prod con GitHub Actions

    Volumen persistente para MySQL

    Separación de entornos con namespaces

🧪 Probado localmente (pero no aplicado a producción):

    Horizontal Pod Autoscaler (HPA) con metrics-server en Minikube

    CronJob para respaldos diarios de la base de datos

📉 Problemas resueltos

    ArgoCD fue descartado por complejidad y reemplazado por GitHub Actions

    El metrics-server en Minikube requería parámetros avanzados (--kubelet-insecure-tls)

    Se migró de NodePort (local) a Ingress (prod) para seguridad y centralización

🧩 Arquitectura visual

Consulta diagramas en la carpeta /diagramas o en Notion:

    Infraestructura general

    CI/CD workflow

    Flujo de usuario desde navegador

    Manifiestos y recursos en Kubernetes

🔭 Futuras mejoras

    Login con Google (OAuth)

    Módulo de gestión para dueños de predios

    Sistema de pagos (MercadoPago / Stripe)

    Observabilidad con Grafana + Prometheus

    GitOps con ArgoCD

¡Gracias por visitar GolGana!
Sistema completo, moderno y funcional para reservas deportivas en la nube ☁️⚽🏐
