import { useRouter } from "next/router";
import { ComponentProps, useEffect, useRef } from "react";

interface Props {
  id: string;
}

export const TrackableSection: React.FC<ComponentProps<"section"> & Props> = (
  props,
) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) return;

        if (entry.isIntersecting && props.id) {
          // @ts-ignore
          window.umami.trackView(`${window.location.pathname}#${props.id}`);
        }
      },
      {
        root: document,
        threshold: 1,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [props.id]);

  return <section ref={sectionRef} {...props} />;
};
