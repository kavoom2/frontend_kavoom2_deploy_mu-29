import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

/**
 * QueryClient를 요청 당 하나씩 생성하면서 사용자 및 요청 간 데이터 공유를 방지합니다.
 * QueryClient를 요청 범위의 싱글톤 인스턴스로 생성합니다.
 *
 * @see https://tanstack.com/query/v4/docs/react/guides/ssr#using-hydrate
 * @see https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/
 */
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
