type Params = Record<string, any>;

interface Event {
  action: string;
  params: Params;
}

const publish = (event: Event) => {
  if (typeof window === "undefined") return;

  // @ts-ignore
  const umami = window?.umami;

  if (umami) {
    umami.trackEvent(event.action, event.params);
  }
};

export const ClientAnalytics = {
  publish,
};
