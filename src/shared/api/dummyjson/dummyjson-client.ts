const DEFAULT_DUMMYJSON_BASE_URL = 'https://dummyjson.com'

interface DummyJsonRequestOptions {
  signal?: AbortSignal
  searchParams?: Record<string, string | number | boolean | null | undefined>
}

export class DummyJsonHttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(`DummyJSON request failed with ${status} ${statusText}`)
    this.name = 'DummyJsonHttpError'
  }
}

function getDummyJsonBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_DUMMYJSON_BASE_URL?.trim() ||
    DEFAULT_DUMMYJSON_BASE_URL
  )
}

function normalizeDummyJsonPath(path: string) {
  return path.replace(/^[/]+/, '')
}

function getDummyJsonBaseUrlWithTrailingSlash() {
  const baseUrl = getDummyJsonBaseUrl()

  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
}

function buildDummyJsonUrl(
  path: string,
  searchParams: DummyJsonRequestOptions['searchParams'],
) {
  const url = new URL(
    normalizeDummyJsonPath(path),
    getDummyJsonBaseUrlWithTrailingSlash(),
  )

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  return url
}

export async function fetchDummyJson<T>(
  path: string,
  options: DummyJsonRequestOptions = {},
): Promise<T> {
  const response = await fetch(
    buildDummyJsonUrl(path, options.searchParams),
    {
      signal: options.signal,
    },
  )

  if (!response.ok) {
    throw new DummyJsonHttpError(response.status, response.statusText)
  }

  return (await response.json()) as T
}
