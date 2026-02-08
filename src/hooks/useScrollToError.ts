import { useEffect, useRef } from 'react';

/**
 * Scroll en haut de la page de façon fluide lorsque `error` contient une valeur.
 * À utiliser dans les pages qui affichent un message d'erreur pour que l'utilisateur le voie.
 */
export function useScrollToError(error: string): void {
  const prevErrorRef = useRef<string>('');

  useEffect(() => {
    if (error && error !== prevErrorRef.current) {
      prevErrorRef.current = error;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (!error) {
      prevErrorRef.current = '';
    }
  }, [error]);
}
