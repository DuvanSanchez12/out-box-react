# Reglas para el Agente: Gestión de Cambios en Git y GitHub

## 1. Análisis de cambios

Antes de cualquier acción, el agente debe:

- Ejecutar `git status` y `git diff --stat` para identificar archivos modificados, agregados o eliminados.
- Revisar `git diff` para entender los cambios específicos en el código.
- Identificar el contexto del cambio (nueva funcionalidad, corrección de errores, refactor, documentación, configuración, etc.).

## 2. Recomendación del mensaje de commit

El agente debe generar una sugerencia de mensaje de commit siguiendo estas buenas prácticas:

- **Formato**: Línea de asunto (máx 50 caracteres) + línea en blanco + cuerpo opcional (máx 72 caracteres por línea).
- **Tipo obligatorio** al inicio del asunto:
  - `feat:` nueva funcionalidad
  - `fix:` corrección de error
  - `docs:` solo documentación
  - `style:` formato, punto y coma, etc. (sin cambios en producción)
  - `refactor:` mejora de código sin cambiar comportamiento
  - `perf:` mejora de rendimiento
  - `test:` añadir o corregir pruebas
  - `chore:` tareas de mantenimiento, configuración
  - `ci:` cambios en integración continua
- **Asunto** en imperativo, presente, sin punto final.
- **Cuerpo** (si necesario) explicando QUÉ cambió y POR QUÉ, no cómo.



## 3. Confirmación previa al push

- El agente **nunca** debe hacer `git push` sin confirmación explícita del usuario.
- Después de mostrar el mensaje de commit sugerido, debe preguntar:

  > "¿Confirmas este commit con el mensaje sugerido? (responde 'sí' o 'no')"

- Si el usuario responde "sí":
  - Ejecutar `git add .` (o archivos específicos si se indica)
  - Ejecutar `git commit -m "mensaje sugerido"`
  - Ejecutar `git push`
  - Reportar éxito o error.

- Si el usuario responde "no":
  - Preguntar si quiere editar el mensaje, cancelar o revisar cambios nuevamente.

## 4. Manejo de errores y casos especiales

- Si hay conflictos o cambios sin seguimiento (`untracked files`), el agente debe listarlos y sugerir acción.
- Si el repositorio no tiene remoto configurado, alertar y detenerse.
- Si hay cambios que parecen peligrosos (ej. archivos de entorno, secretos, compilados), advertir explícitamente.
- Si el usuario confirma un push sin commits locales previos, el agente debe rechazar y pedir hacer commit primero.

## 5. Flujo resumido para el agente

1. `git status` + `git diff` → analizar.
2. Generar mensaje de commit según tipo y contexto.
3. Mostrar mensaje y solicitar confirmación (`sí` / `no`).
4. Si `sí`:
   - `git add` (confirmar qué archivos)
   - `git commit -m "..."`
   - `git push`
   - Informar resultado.
5. Si `no` → esperar instrucciones adicionales (editar mensaje, cancelar, etc.).

## 6. Ejemplo de interacción esperada

**Agente**:  
> Detecté 3 archivos modificados:  
> - src/auth.js (añadida validación)  
> - tests/auth.test.js (nuevas pruebas)  
> - README.md (actualizada documentación)  
>  
> Sugiero el siguiente commit:  
> ```
> feat: implementar validación de email en auth
>
> Se añade regex y pruebas unitarias. Se actualiza README.
> ```
> ¿Confirmas este commit con el mensaje sugerido? (sí/no)

**Usuario**: sí

**Agente**:  
> Commit creado y push realizado a `origin/main`. ✅