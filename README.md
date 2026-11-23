# zainjamshaid — portfolio

Personal site of Zain Jamshaid. Next.js 15 (App Router), React 19, Tailwind CSS 4,
React Three Fiber, Motion and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

The contact form posts to `app/api/send-email/route.js` and needs three variables in `.env`:
`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`.

## Where things live

| Path | What |
| --- | --- |
| `lib/data.js` | Every fact on the site: roles, dates, projects, skills, links. Edit content here only. |
| `app/globals.css` | Design tokens (colour, type, easing) and the few global utilities. |
| `components/three/HeroScene.jsx` | Hero point-cloud orb: custom GLSL shader, cursor and scroll reactive. |
| `components/three/SkillsScene.jsx` | The 3D skill spheres, all in one WebGL canvas. |
| `components/visuals/Visuals.jsx` | Project artwork drawn in code (pipeline, agent graph, chat, browser frame). |
| `components/*.jsx` | One file per page section. |

Keep `lib/data.js`, the résumé PDF in `public/resume/` and LinkedIn in step with each other.

## Credits

Written for this site, drawing on well-known open-source patterns:

- Decal-on-icosahedron skill spheres: after [adrianhajdin/project_3D_developer_portfolio](https://github.com/adrianhajdin/project_3D_developer_portfolio), rebuilt here as a single canvas.
- 3D simplex noise in the hero shader: Ian McEwan / Ashima Arts, [webgl-noise](https://github.com/stegu/webgl-noise) (MIT).
- Skill logos: [Devicon](https://github.com/devicons/devicon) (MIT).
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis) (MIT).
- 3D: [react-three-fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei) (MIT).
- Interaction patterns (magnetic buttons, masked line reveals, scroll-lit text, stacking cards, cursor-follow previews) are in the spirit of [Magic UI](https://github.com/magicuidesign/magicui) and [React Bits](https://github.com/DavidHDev/react-bits); the implementations here are original.
