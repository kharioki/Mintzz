import { useState } from 'react'

import { Header } from '../components/header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);

  const handleShowUserModal = () => {
    setShowUserModal(true)
  }

  const handleCloseUserModal = () => {
    setShowUserModal(false)
  }

  const handleShowNFTModal = () => {
    setShowNFTModal(true)
  }

  const handleCloseNFTModal = () => {
    setShowNFTModal(false)
  }

  const allProps = {
    ...pageProps,
    handleCloseUserModal,
    showUserModal,
    handleCloseNFTModal,
    showNFTModal
  }

  return (
    <>
      <Header showUser={handleShowUserModal} showNFT={handleShowNFTModal} />
      <Component {...allProps} />
    </>
  )
}

export default MyApp
