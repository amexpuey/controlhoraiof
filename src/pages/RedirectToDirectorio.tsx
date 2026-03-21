import { Navigate, useParams } from "react-router-dom";

function RedirectToDirectorio() {
  const { slug } = useParams();
  return <Navigate to={`/directorio/${slug}`} replace />;
}

export const Component = RedirectToDirectorio;
export default RedirectToDirectorio;
