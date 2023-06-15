"use client";

import {
  HydrateProps,
  Hydrate as ReactQueryHydrate,
} from "@tanstack/react-query";

/**
 * 클라이언트에서만 사용할 수 있는 ReactQueryHydrate 컴포넌트입니다.
 *
 * @see https://tanstack.com/query/v4/docs/react/guides/ssr#using-hydrate
 * @see https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/
 */
const HydrateOnClient = (props: HydrateProps) => {
  return <ReactQueryHydrate {...props} />;
};

export default HydrateOnClient;
