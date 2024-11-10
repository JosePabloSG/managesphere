# Contributing a Project to ManageSphere 🌐

¡Gracias por tu interés en contribuir a **ManageSphere**! 🎉 Tu participación es invaluable para mejorar y expandir esta plataforma de gestión de proyectos colaborativos. A continuación, encontrarás una guía detallada para que puedas contribuir de manera efectiva siguiendo el flujo de trabajo GitFlow.

## 📜 Tabla de Contenidos

1. [Cómo Empezar](#cómo-empezar)
2. [Proceso de Contribución](#proceso-de-contribución)
    - [Fork y Clonación del Repositorio](#fork-y-clonación-del-repositorio)
    - [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
    - [GitFlow: Flujo de Trabajo](#gitflow-flujo-de-trabajo)
        - [Ramas Principales](#ramas-principales)
        - [Ramas de Soporte](#ramas-de-soporte)
        - [Crear una Rama de Característica (Feature Branch)](#crear-una-rama-de-característica-feature-branch)
        - [Crear una Rama de Corrección de Errores (Bugfix Branch)](#crear-una-rama-de-corrección-de-errores-bugfix-branch)
        - [Crear una Rama de Lanzamiento (Release Branch)](#crear-una-rama-de-lanzamiento-release-branch)
        - [Crear una Rama de Hotfix](#crear-una-rama-de-hotfix)
    - [Realizar Cambios y Commits](#realizar-cambios-y-commits)
    - [Pruebas](#pruebas)
    - [Actualizar la Rama Principal](#actualizar-la-rama-principal)
    - [Crear un Pull Request (PR)](#crear-un-pull-request-pr)
3. [Guías de Estilo](#guías-de-estilo)
    - [Nomenclatura de Ramas](#nomenclatura-de-ramas)
    - [Mensajes de Commit](#mensajes-de-commit)
4. [Resolución de Conflictos](#resolución-de-conflictos)
5. [Revisión de Código](#revisión-de-código)
6. [Recursos Adicionales](#recursos-adicionales)

## 📖 Código de Conducta

Antes de comenzar, por favor, revisa y respeta nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Queremos asegurar un ambiente colaborativo y respetuoso para todos los contribuyentes.

## 🚀 Cómo Empezar

Sigue estos pasos para configurar tu entorno de desarrollo y comenzar a contribuir:

1. **Fork** el repositorio de ManageSphere a tu cuenta de GitHub.
2. **Clona** tu fork localmente:
    ```bash
    git clone https://github.com/TU_USUARIO/ManageSphere.git
    cd ManageSphere
    ```
3. **Configura** el repositorio remoto para mantenerlo actualizado:
    ```bash
    git remote add upstream https://github.com/ORIGINAL_USUARIO/ManageSphere.git
    ```

## 🔄 Proceso de Contribución

### Fork y Clonación del Repositorio

1. **Fork** el repositorio principal de ManageSphere a tu cuenta de GitHub.
2. **Clona** el fork a tu máquina local:
    ```bash
    git clone https://github.com/TU_USUARIO/ManageSphere.git
    cd ManageSphere
    ```
3. **Añade** el remoto original para sincronizar cambios futuros:
    ```bash
    git remote add upstream https://github.com/ORIGINAL_USUARIO/ManageSphere.git
    ```

### Configuración del Entorno de Desarrollo

1. **Instala** las dependencias tanto para el backend como para el frontend:
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```
2. **Configura** las variables de entorno. Crea un archivo `.env` basado en los ejemplos proporcionados:
    ```bash
    cp .env.example .env
    ```
3. **Inicia** los servidores de desarrollo:
    ```bash
    # Backend
    cd backend
    npm run start:dev

    # Frontend
    cd ../frontend
    npm run dev
    ```

### GitFlow: Flujo de Trabajo

ManageSphere utiliza **GitFlow** para gestionar el desarrollo de manera estructurada. A continuación, se detallan las ramas y cómo utilizarlas:

#### Ramas Principales

- **`main`**: Contiene el código de producción estable. Solo se actualiza mediante `merge` de ramas de lanzamiento o hotfixes.
- **`develop`**: Rama de integración donde se fusionan todas las ramas de características y correcciones antes de prepararse para una nueva versión.

#### Ramas de Soporte

- **Feature Branches**: Para desarrollar nuevas funcionalidades.
- **Bugfix Branches**: Para corregir errores detectados en `develop`.
- **Release Branches**: Para preparar una nueva versión de producción.
- **Hotfix Branches**: Para corregir errores críticos en `main`.

#### Crear una Rama de Característica (Feature Branch)

1. **Actualiza** tu rama `develop` local:
    ```bash
    git checkout develop
    git pull upstream develop
    ```
2. **Crea** una nueva rama de característica:
    ```bash
    git checkout -b feature/nombre-de-la-característica
    ```
3. **Desarrolla** la funcionalidad en esta rama.
4. **Commitea** tus cambios siguiendo las guías de mensajes de commit.
5. **Sincroniza** tu rama con `develop` si es necesario:
    ```bash
    git fetch upstream
    git rebase upstream/develop
    ```
6. **Empuja** la rama a tu fork:
    ```bash
    git push origin feature/nombre-de-la-característica
    ```

#### Crear una Rama de Corrección de Errores (Bugfix Branch)

1. **Actualiza** tu rama `develop` local:
    ```bash
    git checkout develop
    git pull upstream develop
    ```
2. **Crea** una nueva rama de corrección:
    ```bash
    git checkout -b bugfix/nombre-del-error
    ```
3. **Corrige** el error en esta rama.
4. **Commitea** tus cambios siguiendo las guías de mensajes de commit.
5. **Empuja** la rama a tu fork:
    ```bash
    git push origin bugfix/nombre-del-error
    ```

#### Crear una Rama de Lanzamiento (Release Branch)

1. **Actualiza** tu rama `develop` local:
    ```bash
    git checkout develop
    git pull upstream develop
    ```
2. **Crea** una nueva rama de lanzamiento:
    ```bash
    git checkout -b release/v1.0.0
    ```
3. **Realiza** los últimos ajustes y pruebas.
4. **Commitea** cualquier cambio final.
5. **Empuja** la rama a tu fork:
    ```bash
    git push origin release/v1.0.0
    ```
6. **Crea** un Pull Request de `release/v1.0.0` hacia `main` y `develop`.

#### Crear una Rama de Hotfix

1. **Crea** una nueva rama de hotfix desde `main`:
    ```bash
    git checkout main
    git pull upstream main
    git checkout -b hotfix/nombre-del-hotfix
    ```
2. **Corrige** el error crítico.
3. **Commitea** tus cambios siguiendo las guías de mensajes de commit.
4. **Empuja** la rama a tu fork:
    ```bash
    git push origin hotfix/nombre-del-hotfix
    ```
5. **Crea** un Pull Request de `hotfix/nombre-del-hotfix` hacia `main` y `develop`.

### Realizar Cambios y Commits

1. **Realiza** cambios en tu rama de característica, bugfix, etc.
2. **Añade** los archivos modificados:
    ```bash
    git add .
    ```
3. **Commitea** con un mensaje claro y descriptivo:
    ```bash
    git commit -m "feat: agregar funcionalidad de gestión de tareas"
    ```
    **Nota**: Sigue las [Guías de Mensajes de Commit](#mensajes-de-commit) para mantener la consistencia.

### Pruebas

1. **Escribe** pruebas unitarias y de integración para tus cambios.
2. **Ejecuta** las pruebas localmente para asegurarte de que todo funciona correctamente:
    ```bash
    npm test
    ```

### Actualizar la Rama Principal

Antes de crear un Pull Request, asegúrate de que tu rama está actualizada con `develop`:

```bash
git checkout develop
git pull upstream develop
git checkout feature/nombre-de-la-característica
git rebase develop
```

### Crear un Pull Request (PR)

1. **Empuja** tu rama al fork:
    ```bash
    git push origin feature/nombre-de-la-característica
    ```
2. **Navega** al repositorio en GitHub y verás una notificación para crear un Pull Request.
3. **Rellena** el formulario del PR con:
    - Título claro y descriptivo
    - Descripción detallada de los cambios
    - Referencias a issues relacionados (si aplica)
    - Selecciona a los revisores apropiados
4. **Espera** la revisión y responde a cualquier comentario o solicitud de cambios.

## 🎨 Guías de Estilo

### Nomenclatura de Ramas

- Feature Branches: `feature/nombre-de-la-característica`
- Bugfix Branches: `bugfix/nombre-del-error`
- Release Branches: `release/vX.X.X`
- Hotfix Branches: `hotfix/nombre-del-hotfix`

### Mensajes de Commit

Utiliza mensajes de commit que sigan el siguiente formato:

```
<tipo>(<área>): <descripción breve>

<descripción detallada>
```

**Tipos Comunes:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en la documentación
- `style`: Formateo, sin cambios en la lógica
- `refactor`: Refactorización de código
- `test`: Añadir o modificar pruebas
- `chore`: Tareas de mantenimiento

**Ejemplo:**

```
feat(authentication): agregar registro de usuarios con verificación por email

Se implementa el sistema de registro de usuarios permitiendo la verificación mediante un enlace enviado al correo electrónico.
```

## ⚔️ Resolución de Conflictos

1. **Identifica** los archivos en conflicto.
2. **Edita** los archivos para resolver los conflictos manualmente.
3. **Marca** los conflictos como resueltos:
    ```bash
    git add archivo-resuelto
    ```
4. **Continúa** el rebase o merge:
    ```bash
    git rebase --continue
    ```
    o
    ```bash
    git commit
    ```

## 🔍 Revisión de Código

1. **Espera** la revisión de tus compañeros una vez creado el PR.
2. **Responde** a los comentarios y realiza los cambios necesarios.
3. **Actualiza** tu PR empujando nuevos commits a la misma rama.
4. Una vez aprobado, tu PR será fusionado según las políticas del repositorio.

## 📚 Recursos Adicionales

- [Documentación de GitFlow]()
- [Guía de GitHub para Forks y PRs]()
- [Convenciones de Mensajes de Commit]()

¡Gracias nuevamente por tu interés en contribuir a ManageSphere! Si tienes alguna pregunta o necesitas ayuda, no dudes en abrir un Issue o contactarnos directamente.
