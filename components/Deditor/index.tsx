import React from 'react'
import dynamic from 'next/dynamic'

const DynamicLoadedEditor = dynamic(
  import('./../CustomEditorSlateJs/index'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

export default DynamicLoadedEditor