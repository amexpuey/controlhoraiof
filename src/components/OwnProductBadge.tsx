/** Etiqueta que identifica a INWOUT como producto propio del editor del sitio. */
export function isOwnProduct(slug?: string | null) {
  return slug === 'inwout';
}

export function OwnProductBadge() {
  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: 'var(--surface-alt)', color: 'var(--text)', border: '1px solid var(--border)' }}
    >
      Nuestro producto
    </span>
  );
}
