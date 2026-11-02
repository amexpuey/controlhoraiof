import { Link, Outlet, useLocation } from "react-router-dom";

// Rutas sin aviso de editor: herramientas incrustadas y zona privada.
const EXCLUDED = [
  "/excel-control-horario",
  "/calculadora-horas",
  "/calculadora-sanciones",
  "/compliance-checker",
  "/plantillas/verificador-cumplimiento",
  "/admin",
  "/login",
];

export function EditorDisclosure() {
  return (
    <div
      className="w-full text-center text-xs sm:text-sm px-4 py-2"
      style={{ background: "var(--surface-alt)", color: "var(--text)", borderBottom: "1px solid var(--border)" }}
    >
      Editado por INWOUT, uno de los programas que comparamos. INWOUT aparece aquí como producto propio.{" "}
      <Link to="/aviso-legal" className="underline font-medium">
        Aviso legal
      </Link>
    </div>
  );
}

export function PublicLayout() {
  const { pathname } = useLocation();
  const hide = EXCLUDED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  return (
    <>
      {!hide && <EditorDisclosure />}
      <Outlet />
    </>
  );
}
