const CSV_MIME_TYPE = 'text/csv;charset=utf-8'

export function downloadUsersCsv(csv: string, filename: string) {
  if (typeof document === 'undefined') {
    throw new Error('CSV download is only available in the browser.')
  }

  const csvBlob = new Blob([csv], { type: CSV_MIME_TYPE })
  const downloadUrl = URL.createObjectURL(csvBlob)
  const downloadLink = document.createElement('a')

  try {
    downloadLink.href = downloadUrl
    downloadLink.download = filename
    downloadLink.rel = 'noopener'
    downloadLink.style.display = 'none'

    document.body.appendChild(downloadLink)
    downloadLink.click()
  } finally {
    downloadLink.remove()
    URL.revokeObjectURL(downloadUrl)
  }
}
