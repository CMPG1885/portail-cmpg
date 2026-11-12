/* =====================================================================
   CMPG — Document de sélection imprimable (PDF client et PDF chantier)
   Partagé par admin.html et client.html. Mise en page selon la charte 2026.
   Le document s'ouvre dans la fenêtre d'impression du navigateur :
   choisir « Enregistrer au format PDF » (ou imprimer directement).
   ===================================================================== */
(function () {
  const LOGO_B64 = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyOTIuMzIgMTI3LjAzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTIuMzIgMTI3LjAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjM0LDExNC4wM2MtMC4xNiwwLjQ3LTAuMzksMC44Ni0wLjY5LDEuMThjLTAuMywwLjMyLTAuNjYsMC41Ny0xLjA4LDAuNzRjLTAuNDIsMC4xNy0wLjg5LDAuMjYtMS40MSwwLjI2CgkJaC0yLjN2LTcuNTVoMi4zYzAuNTIsMCwwLjk5LDAuMDksMS40MSwwLjI2YzAuNDIsMC4xNywwLjc4LDAuNDIsMS4wOCwwLjc0YzAuMywwLjMyLDAuNTMsMC43MiwwLjY5LDEuMTkKCQljMC4xNiwwLjQ3LDAuMjQsMSwwLjI0LDEuNTlTMTIuNSwxMTMuNTYsMTIuMzQsMTE0LjAzIE0xMi42MSwxMDguOTNjLTAuNDItMC40My0wLjkyLTAuNzUtMS41MS0wLjk5CgkJYy0wLjU5LTAuMjMtMS4yMy0wLjM1LTEuOTQtMC4zNUg1LjU0djkuNjdoMy42MmMwLjcxLDAsMS4zNi0wLjEyLDEuOTQtMC4zNWMwLjU5LTAuMjMsMS4wOS0wLjU2LDEuNTEtMC45OAoJCWMwLjQyLTAuNDIsMC43NC0wLjkzLDAuOTctMS41M2MwLjIzLTAuNTksMC4zNC0xLjI1LDAuMzQtMS45OGMwLTAuNzItMC4xMi0xLjM4LTAuMzQtMS45OEMxMy4zNSwxMDkuODcsMTMuMDIsMTA5LjM2LDEyLjYxLDEwOC45MwoJCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxOC4zNCwxMDcuNiAxOC4zNCwxMTcuMjcgMjQuMywxMTcuMjcgMjQuMywxMTYuMiAxOS42NSwxMTYuMiAxOS42NSwxMTIuOSAyMy40MSwxMTIuOSAyMy40MSwxMTEuODggCgkJMTkuNjUsMTExLjg4IDE5LjY1LDEwOC42NiAyNC4zLDEwOC42NiAyNC4zLDEwNy42IAkiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMy41NywxMTIuNjNjLTAuMjItMC4xOS0wLjQ3LTAuMzUtMC43NC0wLjQ3Yy0wLjI4LTAuMTItMC41Ni0wLjI0LTAuODUtMC4zM3MtMC41Ny0wLjE5LTAuODUtMC4yOQoJCXMtMC41Mi0wLjItMC43NC0wLjMzYy0wLjIyLTAuMTMtMC4zOS0wLjI4LTAuNTMtMC40NmMtMC4xMy0wLjE4LTAuMi0wLjQtMC4yLTAuNjdjMC0wLjIxLDAuMDQtMC40MSwwLjEyLTAuNTkKCQljMC4wOC0wLjE4LDAuMTktMC4zNCwwLjM0LTAuNDhjMC4xNS0wLjEzLDAuMzQtMC4yNCwwLjU2LTAuMzJjMC4yMi0wLjA4LDAuNDgtMC4xMiwwLjc4LTAuMTJjMC4zMSwwLDAuNTgsMC4wNCwwLjc5LDAuMTEKCQljMC4yMiwwLjA4LDAuNDEsMC4xNiwwLjU2LDAuMjVjMC4xNiwwLjA5LDAuMjgsMC4xOCwwLjM4LDAuMjVjMC4xLDAuMDgsMC4xOSwwLjExLDAuMjcsMC4xMWMwLjA3LDAsMC4xMy0wLjAyLDAuMTgtMC4wNQoJCWMwLjA1LTAuMDMsMC4wOS0wLjA4LDAuMTMtMC4xNWwwLjMyLTAuNjJjLTAuMzMtMC4zMi0wLjcyLTAuNTctMS4xNy0wLjc0Yy0wLjQ1LTAuMTctMC45NC0wLjI2LTEuNDgtMC4yNgoJCWMtMC40OCwwLTAuOTEsMC4wNy0xLjI4LDAuMjJjLTAuMzcsMC4xNS0wLjY4LDAuMzUtMC45NCwwLjU5Yy0wLjI1LDAuMjUtMC40NCwwLjUzLTAuNTgsMC44NWMtMC4xMywwLjMyLTAuMiwwLjY1LTAuMiwwLjk5CgkJYzAsMC40MywwLjA3LDAuNzksMC4yLDEuMDhjMC4xMywwLjI5LDAuMzEsMC41MywwLjUyLDAuNzNjMC4yMiwwLjE5LDAuNDYsMC4zNSwwLjc0LDAuNDdjMC4yOCwwLjEyLDAuNTYsMC4yMywwLjg1LDAuMzIKCQlzMC41NywwLjE4LDAuODUsMC4yN2MwLjI4LDAuMDksMC41MiwwLjE5LDAuNzQsMC4zMnMwLjM5LDAuMjgsMC41MiwwLjQ3YzAuMTMsMC4xOSwwLjIsMC40MywwLjIsMC43MmMwLDAuMjctMC4wNCwwLjUxLTAuMTQsMC43MgoJCWMtMC4wOSwwLjIyLTAuMjIsMC40LTAuMzksMC41NmMtMC4xNywwLjE2LTAuMzcsMC4yOC0wLjYyLDAuMzZjLTAuMjQsMC4wOS0wLjUyLDAuMTMtMC44MywwLjEzYy0wLjM3LDAtMC42OS0wLjA1LTAuOTUtMC4xNQoJCWMtMC4yNi0wLjEtMC40OC0wLjIxLTAuNjYtMC4zM2MtMC4xOC0wLjEyLTAuMzMtMC4yMy0wLjQ2LTAuMzNjLTAuMTItMC4xLTAuMjMtMC4xNS0wLjMyLTAuMTVjLTAuMDYsMC0wLjEyLDAuMDItMC4xNywwLjA1CgkJYy0wLjA1LDAuMDMtMC4xLDAuMDgtMC4xMywwLjEzbC0wLjM4LDAuNjJjMC4zNiwwLjM5LDAuOCwwLjY5LDEuMzIsMC45MmMwLjUyLDAuMjMsMS4wOSwwLjM0LDEuNzEsMC4zNAoJCWMwLjUxLDAsMC45Ny0wLjA4LDEuMzctMC4yNGMwLjQtMC4xNiwwLjc0LTAuMzcsMS4wMi0wLjY1YzAuMjgtMC4yNywwLjQ5LTAuNiwwLjYzLTAuOTdjMC4xNC0wLjM3LDAuMjItMC43NywwLjIyLTEuMTkKCQljMC0wLjQtMC4wNy0wLjc0LTAuMi0xLjAxQzMzLjk3LDExMy4wNSwzMy43OSwxMTIuODIsMzMuNTcsMTEyLjYzIi8+Cgk8cmVjdCB4PSIzOC44NCIgeT0iMTA3LjYiIGNsYXNzPSJzdDAiIHdpZHRoPSIxLjMxIiBoZWlnaHQ9IjkuNjciLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MC4zLDExMy4zNmMwLDAuMDcsMC4wMywwLjEzLDAuMDgsMC4xOGMwLjA1LDAuMDUsMC4xMiwwLjA3LDAuMiwwLjA3aDEuNXYyLjEzCgkJYy0wLjE3LDAuMDktMC4zNCwwLjE3LTAuNTEsMC4yNGMtMC4xNywwLjA3LTAuMzUsMC4xMy0wLjU1LDAuMThjLTAuMTksMC4wNS0wLjQsMC4wOS0wLjYyLDAuMTFjLTAuMjIsMC4wMi0wLjQ2LDAuMDQtMC43MiwwLjA0CgkJYy0wLjUyLDAtMS0wLjA5LTEuNDMtMC4yNmMtMC40My0wLjE4LTAuODEtMC40My0xLjEyLTAuNzZjLTAuMzItMC4zMy0wLjU2LTAuNzQtMC43My0xLjIyYy0wLjE3LTAuNDgtMC4yNi0xLjAyLTAuMjYtMS42NAoJCWMwLTAuNTksMC4wOC0xLjExLDAuMjUtMS41OGMwLjE3LTAuNDcsMC40MS0wLjg3LDAuNzItMS4yYzAuMzEtMC4zMywwLjY5LTAuNTksMS4xMy0wLjc2czAuOTMtMC4yNywxLjQ4LTAuMjcKCQljMC4zNywwLDAuNywwLjAzLDAuOTcsMC4wOWMwLjI3LDAuMDYsMC41MSwwLjEzLDAuNzEsMC4yMWMwLjIsMC4wOCwwLjM3LDAuMTcsMC41MSwwLjI2YzAuMTQsMC4wOSwwLjI2LDAuMTcsMC4zOCwwLjIzCgkJYzAuMDksMC4wNSwwLjE2LDAuMDcsMC4yNCwwLjA3YzAuMTIsMCwwLjIyLTAuMDYsMC4zLTAuMThsMC4zNy0wLjU5Yy0wLjIxLTAuMTktMC40My0wLjM2LTAuNjctMC41MQoJCWMtMC4yNC0wLjE1LTAuNS0wLjI4LTAuNzgtMC4zOWMtMC4yOC0wLjExLTAuNTktMC4xOS0wLjkyLTAuMjRjLTAuMzMtMC4wNi0wLjY4LTAuMDgtMS4wNy0wLjA4Yy0wLjc2LDAtMS40NCwwLjEyLTIuMDUsMC4zNgoJCWMtMC42MSwwLjI0LTEuMTMsMC41OC0xLjU2LDEuMDFjLTAuNDMsMC40My0wLjc2LDAuOTYtMC45OSwxLjU2Yy0wLjIzLDAuNjEtMC4zNSwxLjI4LTAuMzUsMi4wMmMwLDAuNzMsMC4xMiwxLjQsMC4zNSwyCgkJYzAuMjQsMC42MSwwLjU3LDEuMTMsMC45OSwxLjU2YzAuNDIsMC40MywwLjkzLDAuNzcsMS41MSwxLjAxYzAuNTksMC4yNCwxLjIzLDAuMzYsMS45MywwLjM2YzAuNCwwLDAuNzctMC4wMiwxLjExLTAuMDYKCQljMC4zNC0wLjA0LDAuNjYtMC4xMSwwLjk2LTAuMmMwLjMtMC4wOSwwLjU4LTAuMiwwLjg0LTAuMzNjMC4yNi0wLjEzLDAuNTItMC4yOCwwLjc2LTAuNDZ2LTMuNzFINTAuM1YxMTMuMzZ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjQuNjEsMTE0LjQ1YzAsMC4xLDAsMC4yMSwwLjAxLDAuMzJjMCwwLjExLDAuMDEsMC4yMiwwLjAzLDAuMzRsLTUuNi03LjI5Yy0wLjA3LTAuMDktMC4xNC0wLjE1LTAuMTktMC4xOAoJCWMtMC4wNi0wLjAzLTAuMTQtMC4wNC0wLjI2LTAuMDRoLTAuNjd2OS42N2gxLjE1di02Ljg5YzAtMC4wOSwwLTAuMTktMC4wMS0wLjNjMC0wLjExLTAuMDEtMC4yMi0wLjAyLTAuMzNsNS42LDcuMjgKCQljMC4wNywwLjA4LDAuMTQsMC4xNSwwLjIxLDAuMThjMC4wNywwLjA0LDAuMTYsMC4wNSwwLjI2LDAuMDVoMC42NnYtOS42N2gtMS4xNVYxMTQuNDV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODcuMDgsMTE1LjE1Yy0wLjA3LDAtMC4xNSwwLjAzLTAuMjIsMC4xYy0wLjE3LDAuMTUtMC4zNCwwLjI4LTAuNTEsMC4zOWMtMC4xNywwLjExLTAuMzUsMC4yLTAuNTUsMC4yNwoJCWMtMC4yLDAuMDctMC40MSwwLjEzLTAuNjQsMC4xNmMtMC4yMywwLjAzLTAuNDksMC4wNS0wLjc4LDAuMDVjLTAuNDcsMC0wLjkxLTAuMDktMS4zMi0wLjI2Yy0wLjQxLTAuMTctMC43Ni0wLjQyLTEuMDYtMC43NQoJCWMtMC4zLTAuMzMtMC41NC0wLjczLTAuNzEtMS4yYy0wLjE3LTAuNDctMC4yNi0xLjAxLTAuMjYtMS42MWMwLTAuNTksMC4wOS0xLjExLDAuMjYtMS41OWMwLjE3LTAuNDcsMC40MS0wLjg3LDAuNzMtMS4yCgkJYzAuMzEtMC4zMywwLjY4LTAuNTgsMS4xMS0wLjc2YzAuNDMtMC4xOCwwLjktMC4yNywxLjQyLTAuMjdjMC4yOSwwLDAuNTQsMC4wMiwwLjc2LDAuMDZjMC4yMiwwLjA0LDAuNDEsMC4xLDAuNTgsMC4xNgoJCWMwLjE3LDAuMDYsMC4zMSwwLjEzLDAuNDMsMC4yYzAuMTIsMC4wNywwLjIzLDAuMTQsMC4zMiwwLjJjMC4wOSwwLjA2LDAuMTcsMC4xMiwwLjIzLDAuMTZjMC4wNywwLjA0LDAuMTMsMC4wNiwwLjE5LDAuMDYKCQljMC4wOCwwLDAuMTMtMC4wMSwwLjE4LTAuMDRjMC4wNC0wLjAzLDAuMDgtMC4wNywwLjExLTAuMTFsMC40My0wLjZjLTAuNC0wLjM4LTAuODYtMC42OC0xLjM3LTAuOWMtMC41Mi0wLjIyLTEuMTMtMC4zMy0xLjg0LTAuMzMKCQljLTAuNzIsMC0xLjM4LDAuMTItMS45NywwLjM2Yy0wLjYsMC4yNC0xLjExLDAuNTgtMS41NCwxLjAyYy0wLjQzLDAuNDQtMC43NiwwLjk2LTAuOTksMS41N2MtMC4yNCwwLjYxLTAuMzUsMS4yOC0wLjM1LDIKCQljMCwwLjczLDAuMTEsMS40LDAuMzMsMmMwLjIyLDAuNjEsMC41MywxLjEzLDAuOTMsMS41NmMwLjQsMC40MywwLjg4LDAuNzcsMS40NSwxLjAxYzAuNTcsMC4yNCwxLjIsMC4zNiwxLjksMC4zNgoJCWMwLjgsMCwxLjQ4LTAuMTMsMi4wNC0wLjM4YzAuNTctMC4yNiwxLjA1LTAuNjEsMS40NC0xLjA3bC0wLjUxLTAuNTZDODcuMjIsMTE1LjE4LDg3LjE2LDExNS4xNSw4Ny4wOCwxMTUuMTUiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05OS41NCwxMTMuOTFjLTAuMTYsMC40Ny0wLjM5LDAuODctMC42OSwxLjE5Yy0wLjMsMC4zMy0wLjY2LDAuNTgtMS4wOCwwLjc1Yy0wLjQyLDAuMTctMC45LDAuMjYtMS40MiwwLjI2CgkJYy0wLjUyLDAtMC45OS0wLjA5LTEuNDEtMC4yNmMtMC40Mi0wLjE3LTAuNzgtMC40Mi0xLjA4LTAuNzVjLTAuMy0wLjMzLTAuNTMtMC43Mi0wLjY5LTEuMTljLTAuMTYtMC40Ny0wLjI0LTEtMC4yNC0xLjYKCQljMC0wLjU5LDAuMDgtMS4xMywwLjI0LTEuNmMwLjE2LTAuNDcsMC4zOS0wLjg3LDAuNjktMS4yYzAuMy0wLjMzLDAuNjYtMC41OCwxLjA4LTAuNzVjMC40Mi0wLjE4LDAuODktMC4yNiwxLjQxLTAuMjYKCQljMC41MiwwLDAuOTksMC4wOSwxLjQyLDAuMjZjMC40MiwwLjE4LDAuNzgsMC40MywxLjA4LDAuNzVjMC4zLDAuMzMsMC41MywwLjczLDAuNjksMS4yYzAuMTYsMC40NywwLjI0LDEsMC4yNCwxLjYKCQlDOTkuNzksMTEyLjkxLDk5LjcxLDExMy40NCw5OS41NCwxMTMuOTEgTTk5LjgxLDEwOC43NWMtMC40Mi0wLjQ0LTAuOTItMC43OC0xLjUxLTEuMDJjLTAuNTktMC4yNC0xLjI0LTAuMzYtMS45NS0wLjM2CgkJcy0xLjM2LDAuMTItMS45NCwwLjM2Yy0wLjU5LDAuMjQtMS4wOSwwLjU4LTEuNTEsMS4wMmMtMC40MiwwLjQ0LTAuNzQsMC45Ni0wLjk3LDEuNTdjLTAuMjMsMC42LTAuMzQsMS4yNy0wLjM0LDEuOTkKCQljMCwwLjczLDAuMTIsMS4zOSwwLjM0LDJjMC4yMywwLjYsMC41NSwxLjEzLDAuOTcsMS41NmMwLjQyLDAuNDQsMC45MiwwLjc4LDEuNTEsMS4wMmMwLjU5LDAuMjQsMS4yMywwLjM2LDEuOTQsMC4zNgoJCXMxLjM2LTAuMTIsMS45NS0wLjM2YzAuNTktMC4yNCwxLjA5LTAuNTgsMS41MS0xLjAyYzAuNDItMC40NCwwLjc0LTAuOTYsMC45Ny0xLjU2YzAuMjMtMC42LDAuMzQtMS4yNywwLjM0LTIKCQljMC0wLjcyLTAuMTItMS4zOS0wLjM0LTEuOTlDMTAwLjU2LDEwOS43MiwxMDAuMjMsMTA5LjE5LDk5LjgxLDEwOC43NSIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExMi4yNSwxMTQuMzNjMCwwLjEsMCwwLjIxLDAuMDEsMC4zMmMwLDAuMTEsMC4wMSwwLjIyLDAuMDMsMC4zNGwtNS42LTcuMjljLTAuMDctMC4wOS0wLjE0LTAuMTUtMC4xOS0wLjE4CgkJYy0wLjA2LTAuMDMtMC4xNC0wLjA0LTAuMjYtMC4wNGgtMC42N3Y5LjY3aDEuMTV2LTYuODljMC0wLjA5LDAtMC4xOS0wLjAxLTAuM2MwLTAuMTEtMC4wMS0wLjIyLTAuMDItMC4zM2w1LjYsNy4yOAoJCWMwLjA3LDAuMDksMC4xNCwwLjE1LDAuMjEsMC4xOGMwLjA3LDAuMDQsMC4xNiwwLjA1LDAuMjYsMC4wNWgwLjY2di05LjY3aC0xLjE1VjExNC4zM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjMuMTUsMTEyLjVjLTAuMjItMC4xOS0wLjQ3LTAuMzUtMC43NC0wLjQ3Yy0wLjI4LTAuMTItMC41Ni0wLjIzLTAuODUtMC4zM2MtMC4yOS0wLjEtMC41Ny0wLjE5LTAuODUtMC4yOQoJCWMtMC4yOC0wLjA5LTAuNTItMC4yLTAuNzQtMC4zM2MtMC4yMi0wLjEzLTAuMzktMC4yOC0wLjUzLTAuNDZjLTAuMTMtMC4xOC0wLjItMC40LTAuMi0wLjY3YzAtMC4yMSwwLjA0LTAuNDEsMC4xMi0wLjU5CgkJYzAuMDgtMC4xOCwwLjE5LTAuMzQsMC4zNC0wLjQ4YzAuMTUtMC4xNCwwLjM0LTAuMjQsMC41Ni0wLjMyYzAuMjItMC4wOCwwLjQ4LTAuMTIsMC43OC0wLjEyYzAuMzEsMCwwLjU4LDAuMDQsMC43OSwwLjEyCgkJYzAuMjIsMC4wOCwwLjQxLDAuMTYsMC41NiwwLjI1YzAuMTYsMC4wOSwwLjI4LDAuMTgsMC4zOCwwLjI1YzAuMSwwLjA4LDAuMTksMC4xMSwwLjI3LDAuMTFjMC4wNywwLDAuMTMtMC4wMiwwLjE4LTAuMDUKCQljMC4wNS0wLjAzLDAuMDktMC4wOCwwLjEzLTAuMTVsMC4zMi0wLjYyYy0wLjMzLTAuMzItMC43Mi0wLjU3LTEuMTctMC43NGMtMC40NS0wLjE3LTAuOTQtMC4yNi0xLjQ4LTAuMjYKCQljLTAuNDgsMC0wLjkxLDAuMDctMS4yOCwwLjIyYy0wLjM3LDAuMTUtMC42OCwwLjM1LTAuOTMsMC41OWMtMC4yNSwwLjI1LTAuNDQsMC41My0wLjU4LDAuODVjLTAuMTMsMC4zMi0wLjIsMC42NS0wLjIsMC45OQoJCWMwLDAuNDMsMC4wNywwLjc5LDAuMiwxLjA4YzAuMTMsMC4yOSwwLjMxLDAuNTMsMC41MiwwLjcyYzAuMjIsMC4xOSwwLjQ2LDAuMzUsMC43NCwwLjQ3YzAuMjgsMC4xMiwwLjU2LDAuMjMsMC44NSwwLjMyCgkJYzAuMjksMC4wOSwwLjU3LDAuMTgsMC44NSwwLjI3YzAuMjgsMC4wOSwwLjUyLDAuMTksMC43NCwwLjMyYzAuMjIsMC4xMywwLjM5LDAuMjgsMC41MiwwLjQ3YzAuMTMsMC4xOSwwLjIsMC40MywwLjIsMC43MgoJCWMwLDAuMjctMC4wNCwwLjUxLTAuMTQsMC43MmMtMC4wOSwwLjIyLTAuMjIsMC40LTAuMzksMC41NmMtMC4xNywwLjE2LTAuMzcsMC4yOC0wLjYyLDAuMzZjLTAuMjQsMC4wOS0wLjUyLDAuMTMtMC44MywwLjEzCgkJYy0wLjM3LDAtMC42OS0wLjA1LTAuOTUtMC4xNXMtMC40OC0wLjIxLTAuNjYtMC4zM2MtMC4xOC0wLjEyLTAuMzMtMC4yMy0wLjQ2LTAuMzNjLTAuMTItMC4xLTAuMjMtMC4xNS0wLjMyLTAuMTUKCQljLTAuMDYsMC0wLjEyLDAuMDItMC4xNywwLjA1Yy0wLjA1LDAuMDMtMC4xLDAuMDgtMC4xMywwLjEybC0wLjM4LDAuNjJjMC4zNiwwLjM5LDAuOCwwLjY5LDEuMzIsMC45MgoJCWMwLjUyLDAuMjMsMS4wOSwwLjM0LDEuNzEsMC4zNGMwLjUxLDAsMC45Ny0wLjA4LDEuMzctMC4yNGMwLjQtMC4xNiwwLjc0LTAuMzcsMS4wMi0wLjY1YzAuMjgtMC4yNywwLjQ5LTAuNiwwLjYzLTAuOTcKCQljMC4xNC0wLjM3LDAuMjItMC43NywwLjIyLTEuMTljMC0wLjQtMC4wNy0wLjc0LTAuMi0xLjAxQzEyMy41NCwxMTIuOTIsMTIzLjM3LDExMi42OSwxMjMuMTUsMTEyLjUiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI3LjE5LDEwNy40OCAxMjcuMTksMTA4LjU4IDEzMC4zMywxMDguNTggMTMwLjMzLDExNy4xNSAxMzEuNjQsMTE3LjE1IDEzMS42NCwxMDguNTggMTM0Ljc2LDEwOC41OCAKCQkxMzQuNzYsMTA3LjQ4IAkiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNDEuNTgsMTEyLjE2aC0xLjM3di0zLjY1aDEuNDNjMC43NSwwLDEuMzIsMC4xNSwxLjcsMC40NGMwLjM4LDAuMjksMC41NywwLjczLDAuNTcsMS4zCgkJYzAsMC4yOC0wLjA1LDAuNTQtMC4xNSwwLjc4cy0wLjI1LDAuNDMtMC40NCwwLjZjLTAuMiwwLjE3LTAuNDQsMC4zLTAuNzMsMC4zOUMxNDIuMywxMTIuMTEsMTQxLjk2LDExMi4xNiwxNDEuNTgsMTEyLjE2CgkJIE0xNDIuOCwxMTIuOWMwLjM3LTAuMDksMC43MS0wLjIxLDEtMC4zOGMwLjI5LTAuMTcsMC41NC0wLjM3LDAuNzUtMC42YzAuMi0wLjI0LDAuMzYtMC41LDAuNDctMC44YzAuMTEtMC4zLDAuMTYtMC42MiwwLjE2LTAuOTYKCQljMC0wLjQxLTAuMDctMC43OC0wLjIxLTEuMTFjLTAuMTQtMC4zMy0wLjM1LTAuNjEtMC42NC0wLjg1Yy0wLjI5LTAuMjMtMC42Ni0wLjQxLTEuMS0wLjU0Yy0wLjQ1LTAuMTItMC45Ny0wLjE5LTEuNTktMC4xOWgtMi43MwoJCXY5LjY3aDEuM3YtNC4wNGgwLjk5YzAuMTgsMCwwLjMxLDAuMDIsMC40MSwwLjA3YzAuMDksMC4wNSwwLjE3LDAuMTMsMC4yNSwwLjIzbDIuNTEsMy40NmMwLjExLDAuMTksMC4yOSwwLjI4LDAuNTMsMC4yOGgxLjE2CgkJbC0yLjgyLTMuODRDMTQzLjExLDExMy4xMywxNDIuOTYsMTEyLjk5LDE0Mi44LDExMi45Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU2LjEyLDExMy4zNWMwLDAuNC0wLjA2LDAuNzgtMC4xNywxLjExYy0wLjEyLDAuMzQtMC4yOCwwLjYzLTAuNSwwLjg3Yy0wLjIyLDAuMjQtMC40OSwwLjQzLTAuOCwwLjU3CgkJYy0wLjMyLDAuMTQtMC42NywwLjItMS4wNywwLjJjLTAuNCwwLTAuNzYtMC4wNy0xLjA4LTAuMjFjLTAuMzItMC4xNC0wLjU5LTAuMzMtMC44LTAuNTdjLTAuMjItMC4yNC0wLjM4LTAuNTMtMC41LTAuODcKCQljLTAuMTEtMC4zNC0wLjE3LTAuNzEtMC4xNy0xLjExdi01Ljg3aC0xLjN2NS44OGMwLDAuNTYsMC4wOSwxLjA4LDAuMjcsMS41NWMwLjE4LDAuNDgsMC40MywwLjg5LDAuNzcsMS4yNAoJCWMwLjMzLDAuMzUsMC43NCwwLjYyLDEuMjEsMC44MmMwLjQ4LDAuMiwxLjAxLDAuMywxLjYxLDAuM2MwLjU5LDAsMS4xMy0wLjEsMS42MS0wLjNjMC40OC0wLjIsMC44OC0wLjQ3LDEuMjEtMC44MgoJCWMwLjMzLTAuMzUsMC41OC0wLjc2LDAuNzYtMS4yNGMwLjE4LTAuNDgsMC4yNy0wLjk5LDAuMjctMS41NXYtNS44OGgtMS4zVjExMy4zNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNjkuMTIsMTE1LjE1Yy0wLjA3LDAtMC4xNSwwLjAzLTAuMjIsMC4xYy0wLjE3LDAuMTUtMC4zNCwwLjI4LTAuNTEsMC4zOWMtMC4xNywwLjExLTAuMzUsMC4yLTAuNTUsMC4yNwoJCWMtMC4xOSwwLjA3LTAuNDEsMC4xMy0wLjY0LDAuMTZjLTAuMjMsMC4wMy0wLjQ5LDAuMDUtMC43OCwwLjA1Yy0wLjQ3LDAtMC45MS0wLjA5LTEuMzItMC4yNmMtMC40MS0wLjE3LTAuNzYtMC40Mi0xLjA2LTAuNzUKCQljLTAuMy0wLjMzLTAuNTQtMC43My0wLjcxLTEuMmMtMC4xNy0wLjQ3LTAuMjYtMS4wMS0wLjI2LTEuNjFjMC0wLjU5LDAuMDktMS4xMSwwLjI2LTEuNTljMC4xNy0wLjQ3LDAuNDEtMC44NywwLjczLTEuMgoJCWMwLjMxLTAuMzMsMC42OC0wLjU4LDEuMTEtMC43NmMwLjQzLTAuMTgsMC45LTAuMjcsMS40Mi0wLjI3YzAuMjksMCwwLjU0LDAuMDIsMC43NiwwLjA2YzAuMjIsMC4wNCwwLjQxLDAuMSwwLjU4LDAuMTYKCQljMC4xNywwLjA2LDAuMzEsMC4xMywwLjQzLDAuMmMwLjEyLDAuMDcsMC4yMywwLjE0LDAuMzIsMC4yYzAuMDksMC4wNiwwLjE3LDAuMTIsMC4yMywwLjE2YzAuMDcsMC4wNCwwLjEzLDAuMDYsMC4xOSwwLjA2CgkJYzAuMDgsMCwwLjE0LTAuMDEsMC4xOC0wLjA0YzAuMDQtMC4wMywwLjA4LTAuMDcsMC4xMS0wLjExbDAuNDMtMC42Yy0wLjQtMC4zOC0wLjg2LTAuNjgtMS4zNy0wLjljLTAuNTEtMC4yMi0xLjEzLTAuMzMtMS44NC0wLjMzCgkJYy0wLjcyLDAtMS4zOCwwLjEyLTEuOTcsMC4zNmMtMC42LDAuMjQtMS4xMSwwLjU4LTEuNTQsMS4wMmMtMC40MywwLjQ0LTAuNzYsMC45Ni0wLjk5LDEuNTdjLTAuMjQsMC42MS0wLjM1LDEuMjgtMC4zNSwyCgkJYzAsMC43MywwLjExLDEuNCwwLjMzLDJjMC4yMiwwLjYxLDAuNTMsMS4xMywwLjkzLDEuNTZjMC40LDAuNDMsMC44OCwwLjc3LDEuNDUsMS4wMWMwLjU3LDAuMjQsMS4yLDAuMzYsMS45LDAuMzYKCQljMC44LDAsMS40OC0wLjEzLDIuMDQtMC4zOGMwLjU2LTAuMjYsMS4wNC0wLjYxLDEuNDQtMS4wN2wtMC41MS0wLjU2QzE2OS4yNSwxMTUuMTgsMTY5LjE5LDExNS4xNSwxNjkuMTIsMTE1LjE1Ii8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjE3My4xOSwxMDcuNDggMTczLjE5LDEwOC41OCAxNzYuMzMsMTA4LjU4IDE3Ni4zMywxMTcuMTUgMTc3LjY0LDExNy4xNSAxNzcuNjQsMTA4LjU4IDE4MC43NywxMDguNTggCgkJMTgwLjc3LDEwNy40OCAJIi8+Cgk8cmVjdCB4PSIxODUuMDIiIHk9IjEwNy40OCIgY2xhc3M9InN0MCIgd2lkdGg9IjEuMzEiIGhlaWdodD0iOS42NyIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE5OC45NSwxMTMuOTFjLTAuMTYsMC40Ny0wLjM5LDAuODctMC42OSwxLjE5Yy0wLjMsMC4zMy0wLjY2LDAuNTgtMS4wOCwwLjc1Yy0wLjQyLDAuMTctMC45LDAuMjYtMS40MiwwLjI2CgkJYy0wLjUyLDAtMC45OS0wLjA5LTEuNDEtMC4yNmMtMC40Mi0wLjE3LTAuNzgtMC40Mi0xLjA4LTAuNzVjLTAuMy0wLjMzLTAuNTMtMC43Mi0wLjY5LTEuMTljLTAuMTYtMC40Ny0wLjI0LTEtMC4yNC0xLjYKCQljMC0wLjU5LDAuMDgtMS4xMywwLjI0LTEuNmMwLjE2LTAuNDcsMC4zOS0wLjg3LDAuNjktMS4yYzAuMy0wLjMzLDAuNjYtMC41OCwxLjA4LTAuNzVjMC40Mi0wLjE4LDAuODktMC4yNiwxLjQxLTAuMjYKCQljMC41MiwwLDAuOTksMC4wOSwxLjQyLDAuMjZjMC40MiwwLjE4LDAuNzgsMC40MywxLjA4LDAuNzVjMC4zLDAuMzMsMC41MywwLjczLDAuNjksMS4yYzAuMTYsMC40NywwLjI0LDEsMC4yNCwxLjYKCQlDMTk5LjE5LDExMi45MSwxOTkuMTEsMTEzLjQ0LDE5OC45NSwxMTMuOTEgTTE5OS4yMiwxMDguNzVjLTAuNDItMC40NC0wLjkyLTAuNzgtMS41MS0xLjAyYy0wLjU5LTAuMjQtMS4yNC0wLjM2LTEuOTUtMC4zNgoJCXMtMS4zNiwwLjEyLTEuOTQsMC4zNmMtMC41OSwwLjI0LTEuMDksMC41OC0xLjUsMS4wMmMtMC40MiwwLjQ0LTAuNzQsMC45Ni0wLjk3LDEuNTdjLTAuMjMsMC42LTAuMzQsMS4yNy0wLjM0LDEuOTkKCQljMCwwLjczLDAuMTEsMS4zOSwwLjM0LDJjMC4yMywwLjYsMC41NSwxLjEzLDAuOTcsMS41NmMwLjQyLDAuNDQsMC45MiwwLjc4LDEuNSwxLjAyYzAuNTksMC4yNCwxLjIzLDAuMzYsMS45NCwwLjM2CgkJczEuMzYtMC4xMiwxLjk1LTAuMzZjMC41OS0wLjI0LDEuMDktMC41OCwxLjUxLTEuMDJjMC40Mi0wLjQ0LDAuNzQtMC45NiwwLjk3LTEuNTZjMC4yMy0wLjYsMC4zNC0xLjI3LDAuMzQtMgoJCWMwLTAuNzItMC4xMi0xLjM5LTAuMzQtMS45OUMxOTkuOTYsMTA5LjcyLDE5OS42NCwxMDkuMTksMTk5LjIyLDEwOC43NSIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxMS42NSwxMTQuMzNjMCwwLjEsMCwwLjIxLDAuMDEsMC4zMmMwLDAuMTEsMC4wMSwwLjIyLDAuMDMsMC4zNGwtNS42LTcuMjljLTAuMDctMC4wOS0wLjE0LTAuMTUtMC4xOS0wLjE4CgkJYy0wLjA2LTAuMDMtMC4xNC0wLjA0LTAuMjYtMC4wNGgtMC42OHY5LjY3aDEuMTV2LTYuODljMC0wLjA5LDAtMC4xOS0wLjAxLTAuM3MtMC4wMS0wLjIyLTAuMDItMC4zM2w1LjYsNy4yOAoJCWMwLjA3LDAuMDksMC4xNCwwLjE1LDAuMjEsMC4xOGMwLjA3LDAuMDQsMC4xNiwwLjA1LDAuMjYsMC4wNWgwLjY2di05LjY3aC0xLjE1VjExNC4zM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03My4yNSwxMTUuNTJjLTAuNDcsMC0wLjg1LDAuMzgtMC44NSwwLjg1YzAsMC40NywwLjM4LDAuODUsMC44NSwwLjg1czAuODUtMC4zOCwwLjg1LTAuODUKCQlDNzQuMSwxMTUuOSw3My43MiwxMTUuNTIsNzMuMjUsMTE1LjUyIi8+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ0LjAxLDEwLjc3Yy0yMi40MywwLTQwLjY5LDE4LjI1LTQwLjY5LDQwLjY5YzAsMjIuNDMsMTguMjUsNDAuNjgsNDAuNjksNDAuNjgKCQkJCWM5Ljc4LDAsMTkuMjMtMy41MiwyNi42Mi05LjkybC0yLjQxLTIuNjljLTYuNzMsNS44LTE1LjMxLDktMjQuMiw5Yy0yMC40NCwwLTM3LjA3LTE2LjYzLTM3LjA3LTM3LjA3CgkJCQljMC0yMC40NCwxNi42My0zNy4wNywzNy4wNy0zNy4wN2M4Ljg5LDAsMTcuNDgsMy4xOSwyNC4yLDlsMi40MS0yLjY5QzYzLjI0LDE0LjI5LDUzLjgsMTAuNzcsNDQuMDEsMTAuNzd6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04Mi41NCw5MS40M2gzLjYxVjE5LjJsMzQuODIsNTkuMDVsMzkuMzgtNjYuNzdoLTQuMmwtMzUuMTgsNTkuNjZsLTAuMjMtMC4zOEw4NS43OSwxMS40OGgtMy4yNlY5MS40M3oiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2Ny44OCw5MS40M2gzLjYyVjU4LjQ3aDE4Ljk2YzEyLjk2LDAsMjMuNS0xMC41NCwyMy41LTIzLjVzLTEwLjU0LTIzLjUtMjMuNS0yMy41aC0yMi41N3YzLjYxaDIyLjU3CgkJCQljMTAuOTYsMCwxOS44OCw4LjkyLDE5Ljg4LDE5Ljg4YzAsMTAuOTYtOC45MiwxOS44OC0xOS44OCwxOS44OGgtMjIuNTdMMTY3Ljg4LDkxLjQzeiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjYwLjksMTAuNzdjLTIyLjQzLDAtNDAuNjksMTguMjUtNDAuNjksNDAuNjljMCwyMi40MywxOC4yNSw0MC42OCw0MC42OSw0MC42OAoJCQkJYzEwLjcxLDAsMjAuODItNC4xMywyOC40OC0xMS42M2wwLjU0LTAuNTNsMC0yNC4xMWgtMTkuOTZ2My42MWgxNi4zNWwwLDE4Ljk3bC0wLjIzLDAuMjFjLTYuODYsNi4zNi0xNS44LDkuODYtMjUuMTcsOS44NgoJCQkJYy0yMC40NCwwLTM3LjA3LTE2LjYzLTM3LjA3LTM3LjA3YzAtMjAuNDQsMTYuNjMtMzcuMDcsMzcuMDctMzcuMDdjOC44OSwwLDE3LjQ3LDMuMTksMjQuMiw5bDIuNDEtMi42OQoJCQkJQzI4MC4xMywxNC4yOSwyNzAuNjksMTAuNzcsMjYwLjksMTAuNzd6Ii8+CgkJPC9nPgoJPC9nPgoJPHJlY3QgeD0iMjIwLjg4IiB5PSIxMTQuNjIiIGNsYXNzPSJzdDAiIHdpZHRoPSI2OS43NSIgaGVpZ2h0PSIyLjUyIi8+CjwvZz4KPC9zdmc+Cg==';
  const svgBlanc = atob(LOGO_B64);
  const svgFonce = svgBlanc.replace(/#FFFFFF/gi, '#3A3B3A');
  const enc = s => 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s)));
  const LOGO_BLANC = enc(svgBlanc), LOGO_FONCE = enc(svgFonce);

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const argent = v => Number(v || 0).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' });
  const nb = v => { const n = Number(v ?? 1); return Number.isInteger(n) ? String(n) : n.toLocaleString('fr-CA'); };
  const unite = u => (!u || u === 'unité') ? '' : u;
  function perteEffective(opt, bp) {
    const p = opt?.perte_pct;
    if (p !== null && p !== undefined && p !== '') return Number(p);
    return Number(bp?.perte_pct ?? 0);
  }
  function qteCommandee(q, perte) {
    q = Number(q ?? 1); perte = Number(perte ?? 0);
    return perte ? Math.round(q * (1 + perte / 100) * 100) / 100 : q;
  }
  function lignesFinis(opt) {
    const l = [];
    const c = [opt.coulis_fabricant, opt.coulis_couleur].filter(Boolean).join(' · ');
    const s = [opt.lisiere_fabricant, opt.lisiere_couleur].filter(Boolean).join(' · ');
    if (c) l.push('Coulis : ' + c);
    if (s) l.push('Lisière : ' + s);
    if (opt.fini_peinture) l.push('Fini : ' + opt.fini_peinture);
    return l;
  }
  const dateCourte = d => d ? new Date(d).toLocaleDateString('fr-CA') : '';
  const STATUT = { 'approuvé': ['Approuvé', '#4B6B55'], 'en_attente': ['En attente', '#ACA298'], 'à_revoir': ['À revoir', '#523525'] };
  const compRef = (a, b) => String(a || '').localeCompare(String(b || ''), 'fr', { numeric: true, sensitivity: 'base' });

  // ── Regroupement : catégorie → sous-catégorie → lignes ──
  function preparer(postes, mode) {
    const cats = {}, historique = [];
    (postes || []).forEach(poste => {
      const cat = poste.categories; if (!cat) return;
      const toutes = poste.options_produits || [];
      const approuve = toutes.find(o => o.statut_client === 'approuvé');
      const opts = mode === 'chantier'
        ? toutes.filter(o => o.statut_client === 'approuvé')
        : toutes.filter(o => o.statut_client !== 'annulé');
      const pieces = (poste.pieces || []).join(', ') || poste.piece || '';
      opts.forEach(opt => {
        const bp = opt.banque_produits; if (!bp) return;
        const perte = perteEffective(opt, bp);
        const qNette = Number(opt.quantite || 1), qCmd = qteCommandee(qNette, perte);
        const u = unite(bp.unite_prix);
        const qTxt = perte ? `${nb(qNette)}${u ? ' ' + u : ''} → ${nb(qCmd)}${u ? ' ' + u : ''} avec perte` : `${nb(qNette)}${u ? ' ' + u : ''}`;
        const ligne = {
          ref: poste.reference || '', pieces, nom: bp.nom || '', fab: bp.fabricant || '', mod: bp.modele || '', sku: bp.sku || '',
          coul: bp.couleur || '', dim: bp.dimensions || '', qte: qTxt, pu: bp.prix != null ? Number(bp.prix) : null, unite: u,
          total: bp.prix != null ? qCmd * Number(bp.prix) : null, statut: opt.statut_client || 'en_attente',
          date: opt.date_decision, pre: !!opt.pre_approuve_cmpg, finis: lignesFinis(opt), photo: bp.photo_url || '', lien: bp.url || '',
          lettre: (poste.options_produits || []).length > 1 ? opt.lettre_option : '',
        };
        if (mode === 'client' && opt.statut_client === 'à_revoir' && opt.commentaire_client === 'Option non retenue') {
          historique.push({ cat: cat.nom, ...ligne, remplacePar: approuve?.banque_produits?.nom || '' });
          return;
        }
        const c = cats[cat.id] = cats[cat.id] || { nom: cat.nom, ordre: cat.ordre ?? 999, sc: {} };
        const scN = poste.sous_categories;
        const k = scN ? scN.id : '_';
        const s = c.sc[k] = c.sc[k] || { nom: scN ? scN.nom : '', ordre: scN ? (scN.ordre ?? 999) : -1, lignes: [] };
        s.lignes.push(ligne);
      });
    });
    const liste = Object.values(cats).sort((a, b) => a.ordre - b.ordre).map(c => ({
      nom: c.nom,
      sc: Object.values(c.sc).sort((a, b) => a.ordre - b.ordre).map(s => ({ ...s, lignes: s.lignes.sort((a, b) => compRef(a.ref, b.ref)) })),
    }));
    liste.forEach(c => {
      const l = c.sc.flatMap(s => s.lignes);
      c.nb = l.length; c.approuves = l.filter(x => x.statut === 'approuvé').length;
      c.total = l.reduce((t, x) => t + (x.total || 0), 0);
    });
    historique.sort((a, b) => compRef(a.ref, b.ref));
    return { cats: liste, historique };
  }

  const CSS = `
@page { size: letter landscape; margin: .42in .5in .55in;
  @bottom-left { content: var(--pied); font: 500 6.5pt Roboto, sans-serif; letter-spacing: 1.5px; text-transform: uppercase; color: #ACA298; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 500 6.5pt Roboto, sans-serif; letter-spacing: 1.5px; color: #ACA298; } }
@page couverture { size: letter landscape; margin: 0; @bottom-left { content: none } @bottom-right { content: none } }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: Roboto, sans-serif; color: #3A3B3A; font-variant-numeric: lining-nums; background: #fff; }
.serif { font-family: 'Playfair Display', serif; font-weight: 400; }
.couverture { page: couverture; width: 11in; height: 8.48in; overflow: hidden; display: grid; grid-template-columns: 4.6in 1fr; break-after: page; }
.cov-g { background: #3A3B3A; color: #fff; padding: .75in .6in; display: flex; flex-direction: column; justify-content: space-between; }
.cov-g img { width: 2.3in; }
.lbl { font-size: 7.5pt; letter-spacing: 3px; text-transform: uppercase; color: #ACA298; white-space: nowrap; }
.cov-g h1 { font-size: 30pt; line-height: 1.12; margin: 10px 0 18px; }
.rule { height: 1px; background: rgba(255,255,255,.35); margin: 0 -.6in 22px 0; }
.cov-g dl { display: grid; grid-template-columns: 1.15in 1fr; row-gap: 7px; font-size: 9pt; font-weight: 300; }
.cov-g dt { color: #ACA298; text-transform: uppercase; letter-spacing: 1.5px; font-size: 7pt; padding-top: 2px; font-weight: 500; }
.cov-d { background: #F1EEE8; padding: .9in .75in; display: flex; flex-direction: column; }
.cov-d h2 { font-size: 30pt; margin-bottom: .3in; }
.som div { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #3A3B3A; padding: 12px 0; font-size: 9.5pt; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
.som small { font-weight: 300; letter-spacing: .5px; text-transform: none; font-size: 8.5pt; color: #6F6863; margin-left: 10px; }
.som span:last-child { font-weight: 400; letter-spacing: .5px; text-transform: none; font-size: 9pt; }
.cov-d .tot { margin-top: auto; display: flex; gap: .5in; padding-top: .3in; }
.kpi b { display: block; font-family: 'Playfair Display', serif; font-weight: 400; font-size: 22pt; }
.kpi span { font-size: 7pt; letter-spacing: 2px; text-transform: uppercase; color: #6F6863; }
section.cat { break-before: page; }
section.cat:first-of-type { break-before: auto; }
.hd { display: flex; justify-content: space-between; align-items: center; }
.hd img { height: .36in; }
.hd .meta { font-size: 7pt; letter-spacing: 2px; text-transform: uppercase; color: #6F6863; text-align: right; line-height: 1.7; }
.ttl { display: flex; justify-content: space-between; align-items: flex-end; padding: .22in 0 .14in; }
.ttl h2 { font-size: 26pt; border-left: 1px solid #3A3B3A; padding-left: 14px; line-height: 1; }
.resume { display: flex; gap: 28px; text-align: right; }
.resume b { display: block; font-family: 'Playfair Display', serif; font-weight: 400; font-size: 15pt; }
.resume span { font-size: 6.5pt; letter-spacing: 1.8px; text-transform: uppercase; color: #6F6863; }
table { width: 100%; border-collapse: collapse; font-size: 7.6pt; }
thead { display: table-header-group; }
thead tr.entete td { padding: 0; border-bottom: none; }
tr { break-inside: avoid; }
tr.sc { break-after: avoid; }
thead th { font-size: 6.3pt; letter-spacing: 1.6px; text-transform: uppercase; font-weight: 500; color: #ACA298; text-align: left; padding: 6px; border-bottom: 1px solid #3A3B3A; }
th.r, td.r { text-align: right; }
td { padding: 7px 6px; border-bottom: 1px solid #EEEDEE; vertical-align: middle; }
tr.sc td { border-bottom: none; padding: 12px 6px 4px; font-size: 6.8pt; letter-spacing: 2.2px; text-transform: uppercase; color: #523525; font-weight: 700; }
.ref { font-family: 'Playfair Display', serif; font-size: 10.5pt; white-space: nowrap; }
.ref small { font-family: Roboto, sans-serif; font-size: 6.5pt; letter-spacing: 1px; color: #ACA298; margin-left: 4px; }
.pcs { color: #6F6863; font-size: 7pt; margin-top: 2px; }
.prod { display: flex; gap: 10px; align-items: center; }
.ph { width: .62in; height: .62in; flex: 0 0 .62in; border-radius: 6px; border: 1px solid #EEEDEE; background: #F1EEE8; overflow: hidden; }
.ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
.n { font-weight: 500; font-size: 8.4pt; }
.f { color: #6F6863; font-size: 7pt; margin-top: 1px; }
.x { color: #523525; font-size: 7pt; margin-top: 2px; }
.st { display: inline-flex; align-items: center; gap: 5px; font-size: 7pt; white-space: nowrap; }
.st i { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.dt { white-space: nowrap; }
.pre { white-space: nowrap; margin-top: 2px; font-size: 6.3pt; color: #ACA298; letter-spacing: .3px; }
a.lien { color: #523525; font-size: 7pt; }
.chk { display: inline-block; width: 9px; height: 9px; border: 1px solid #3A3B3A; border-radius: 2px; vertical-align: -1px; margin-right: 4px; }
.notes { border-bottom: 1px solid #D6D2D0 !important; }
.note { margin-top: .18in; font-size: 7.2pt; color: #6F6863; line-height: 1.6; max-width: 7in; }
.signe { display: grid; grid-template-columns: 1fr 1fr; gap: .6in; margin-top: .35in; }
.signe div { border-top: 1px solid #3A3B3A; padding-top: 6px; font-size: 6.8pt; letter-spacing: 1.5px; text-transform: uppercase; color: #6F6863; }
`;

  function construireHTML({ mode, projet, postes }) {
    const { cats, historique } = preparer(postes, mode);
    const doc = mode === 'client' ? 'Sélection client' : 'Document de chantier';
    const numero = projet.numero || '';
    const nomProjet = projet.nom || '';
    const aujourdhui = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
    const tous = cats.flatMap(c => c.sc.flatMap(s => s.lignes));
    const totalG = tous.reduce((t, x) => t + (x.total || 0), 0);
    const nbApp = tous.filter(x => x.statut === 'approuvé').length;
    const meta = `${esc(doc)}<br>${esc(nomProjet)} · ${esc(aujourdhui)}`;

    const som = cats.map(c => `<div><span>${esc(c.nom)}<small>${c.nb} élément${c.nb > 1 ? 's' : ''}</small></span><span>${mode === 'client' ? argent(c.total) : `${c.approuves} à commander`}</span></div>`).join('')
      + (mode === 'client' ? '<div><span>Récapitulatif et approbation</span><span></span></div>' : '');
    const kpis = mode === 'client'
      ? `<div class="kpi"><b>${tous.length}</b><span>Éléments</span></div><div class="kpi"><b>${nbApp}/${tous.length}</b><span>Approuvés</span></div><div class="kpi"><b>${argent(totalG)}</b><span>Estimation avant taxes</span></div>`
      : `<div class="kpi"><b>${tous.length}</b><span>Éléments approuvés à commander</span></div>`;
    const couverture = `<div class="couverture"><div class="cov-g"><img src="${LOGO_BLANC}" alt="CMPG"><div>
      <div class="lbl">${numero ? 'Projet ' + esc(numero) : 'Projet'}</div>
      <h1 class="serif">${mode === 'client' ? 'Sélection des finis<br>et produits' : 'Document de<br>chantier'}</h1><div class="rule"></div>
      <dl><dt>Projet</dt><dd>${esc(nomProjet)}</dd>${projet.client ? `<dt>Client</dt><dd>${esc(projet.client)}</dd>` : ''}${projet.adresse ? `<dt>Adresse</dt><dd>${esc(projet.adresse)}</dd>` : ''}${projet.responsable ? `<dt>Chargé(e) de projet</dt><dd>${esc(projet.responsable)}</dd>` : ''}<dt>Date</dt><dd>${esc(aujourdhui)}</dd></dl></div>
      <div class="lbl">CMPG Design Construction · 450 455-6006</div></div>
      <div class="cov-d"><h2 class="serif">Sommaire</h2><div class="som">${som}</div><div class="tot">${kpis}</div></div></div>`;

    const photo = l => `<div class="ph">${l.photo ? `<img src="${esc(l.photo)}" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}</div>`;
    const statutHTML = (l, avecPre) => {
      const [lab, col] = STATUT[l.statut] || [l.statut, '#ACA298'];
      return `<span class="st"><i style="background:${col}"></i>${lab}</span>${l.date && l.statut === 'approuvé' ? `<div class="pcs dt">le ${dateCourte(l.date)}</div>` : ''}${avecPre && l.pre ? '<div class="pre">✓ Pré-approuvé CMPG</div>' : ''}`;
    };
    const produit = l => `<div class="prod">${photo(l)}<div><div class="n">${esc(l.nom)}</div><div class="f">${esc([l.fab, l.mod].filter(Boolean).join(' · '))}</div>${l.finis.map(x => `<div class="x">${esc(x)}</div>`).join('')}</div></div>`;
    const refHTML = l => `<div class="ref">${esc(l.ref)}${l.lettre ? `<small>OPT. ${esc(l.lettre)}</small>` : ''}</div><div class="pcs">${esc(l.pieces)}</div>`;

    const sections = cats.map(c => {
      const lignes = c.sc.map(s => (s.nom ? `<tr class="sc"><td colspan="9">${esc(s.nom)}</td></tr>` : '') + s.lignes.map(l => mode === 'client'
        ? `<tr><td>${refHTML(l)}</td><td>${produit(l)}</td><td>${esc(l.coul)}<div class="pcs">${esc(l.dim)}</div></td><td>${esc(l.qte)}</td><td class="r" style="white-space:nowrap">${l.pu != null ? argent(l.pu) + (l.unite ? ' / ' + esc(l.unite) : '') : '—'}</td><td class="r" style="white-space:nowrap"><b>${l.total != null ? argent(l.total) : '—'}</b></td><td>${statutHTML(l, true)}</td><td>${l.lien ? `<a class="lien" href="${esc(l.lien)}">Voir le produit</a>` : ''}</td></tr>`
        : `<tr><td>${refHTML(l)}</td><td>${produit(l)}</td><td>${esc(l.sku)}</td><td>${esc(l.coul)}<div class="pcs">${esc(l.dim)}</div></td><td>${esc(l.qte)}</td><td>${statutHTML(l, false)}</td><td style="white-space:nowrap;line-height:1.9"><span class="chk"></span>Commandé<br><span class="chk"></span>Reçu</td><td class="notes"></td></tr>`
      ).join('')).join('');
      const tete = mode === 'client'
        ? '<th style="width:.95in">Réf. · Pièce(s)</th><th>Produit</th><th style="width:1.05in">Couleur · Dimensions</th><th style="width:1.05in">Quantité</th><th class="r" style="width:.85in">Prix unit.</th><th class="r" style="width:.8in">Total</th><th style="width:1.05in">Statut</th><th style="width:.75in">Lien</th>'
        : '<th style="width:.95in">Réf. · Pièce(s)</th><th style="width:2.15in">Produit</th><th style="width:.8in">Code</th><th style="width:.95in">Couleur · Dimensions</th><th style="width:1in">Quantité à commander</th><th style="width:.95in">Statut</th><th style="width:.85in">Suivi</th><th>Notes chantier</th>';
      const res = mode === 'client'
        ? `<div><b>${c.nb}</b><span>Éléments</span></div><div><b>${c.nb - c.approuves}</b><span>En attente</span></div><div><b>${argent(c.total)}</b><span>Estimation avant taxes</span></div>`
        : `<div><b>${c.nb}</b><span>Approuvés à commander</span></div>`;
      // L'entête (logo + projet + catégorie) est dans le thead : elle se répète sur chaque page avec les titres de colonnes.
      return `<section class="cat"><table><thead><tr class="entete"><td colspan="9"><div class="hd"><img src="${LOGO_FONCE}" alt="CMPG"><div class="meta">${meta}</div></div>
        <div class="ttl"><h2 class="serif">${esc(c.nom)}</h2><div class="resume">${res}</div></div></td></tr>
        <tr>${tete}</tr></thead><tbody>${lignes}</tbody></table></section>`;
    }).join('');

    let recap = '';
    if (mode === 'client') {
      const lignes = cats.map(c => `<tr><td class="ref">${esc(c.nom)}</td><td>${c.nb}</td><td>${c.approuves} / ${c.nb}</td><td class="r">${argent(c.total)}</td></tr>`).join('')
        + `<tr><td class="ref" style="border-bottom:1px solid #3A3B3A"><b>Total</b></td><td></td><td></td><td class="r" style="font-family:'Playfair Display',serif;font-size:13pt">${argent(totalG)}</td></tr>`;
      const hist = historique.length ? `<div class="ttl" style="padding-top:.3in"><h2 class="serif" style="font-size:15pt">Options non retenues</h2></div>
        <table style="width:7in"><thead><tr><th>Catégorie</th><th>Réf.</th><th>Produit</th><th>Remplacé par</th></tr></thead><tbody>${historique.map(h => `<tr><td>${esc(h.cat)}</td><td class="ref">${esc(h.ref)}</td><td>${produit(h)}</td><td>${esc(h.remplacePar || '—')}</td></tr>`).join('')}</tbody></table>` : '';
      recap = `<section class="cat"><div class="hd"><img src="${LOGO_FONCE}" alt="CMPG"><div class="meta">${meta}</div></div>
        <div class="ttl"><h2 class="serif">Récapitulatif</h2></div>
        <table style="width:5.4in"><thead><tr><th>Catégorie</th><th>Éléments</th><th>Approuvés</th><th class="r">Estimation avant taxes</th></tr></thead><tbody>${lignes}</tbody></table>
        ${hist}
        <p class="note">Les montants sont des estimations avant taxes, basées sur les prix des fournisseurs à la date du document. Ils peuvent varier selon les disponibilités et les quantités finales mesurées au chantier.</p>
        <div class="signe"><div>Approbation du client — signature et date</div><div>CMPG Design Construction</div></div></section>`;
    }
    const vide = cats.length === 0 && !historique.length;
    const titre = `${nomProjet} — ${doc}`;
    return { vide, titre, html: `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(titre)}</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>:root{--pied:"CMPG Design Construction · ${doc}"}${CSS}</style></head><body>${couverture}${sections}${recap}</body></html>` };
  }

  // Ouvre la fenêtre d'impression (iframe caché : pas de fenêtre surgissante à autoriser)
  async function imprimer(params) {
    const { vide, titre, html } = construireHTML(params);
    if (vide) return { vide: true };
    document.getElementById('cmpg-impression')?.remove();
    const f = document.createElement('iframe');
    f.id = 'cmpg-impression';
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f);
    const d = f.contentDocument;
    d.open(); d.write(html); d.close();
    // Attendre les polices (sinon le navigateur imprime une police de remplacement, plus grasse) et les photos (8 s max par photo)
    try {
      await new Promise(r => { const l = d.querySelector('link[rel=stylesheet]'); if (!l || l.sheet) return r(); l.onload = r; l.onerror = r; setTimeout(r, 4000); });
      await Promise.race([Promise.all(['300 9pt Roboto', '400 9pt Roboto', '500 9pt Roboto', '700 9pt Roboto', '400 22pt "Playfair Display"'].map(f => d.fonts.load(f))), new Promise(r => setTimeout(r, 4000))]);
      await d.fonts.ready;
    } catch (e) {}
    await Promise.all([...d.images].map(img => img.complete ? null : new Promise(r => {
      const t = setTimeout(r, 8000); img.onload = img.onerror = () => { clearTimeout(t); r(); };
    })));
    const ancienTitre = document.title;
    document.title = titre;                       // nom de fichier proposé à l'enregistrement
    f.contentWindow.focus();
    f.contentWindow.print();
    setTimeout(() => { document.title = ancienTitre; }, 1500);
    return { vide: false };
  }

  // preparer et le logo servent aussi au PDF direct (selection-pdf-direct.js)
  window.CMPGSelection = { construireHTML, imprimer, preparer, LOGO_SVG: svgBlanc };
})();
