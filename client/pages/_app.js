import { useState } from 'react'

import { Header } from '../components/header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [address, setAddress] = useState('0x0000000000000000000000000000000000000000');
  const [avatar, setAvatar] = useState('https://cdn.pixabay.com/photo/2022/03/23/02/50/skeleton-7086311_960_720.png');

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
    address,
    avatar,
    handleCloseUserModal,
    showUserModal,
    handleCloseNFTModal,
    showNFTModal
  }

  return (
    <>
      <Header
        address={address}
        avatar={avatar}
        showUser={handleShowUserModal}
        showNFT={handleShowNFTModal}
      />
      <Component {...allProps} />
    </>
  )
}

export default MyApp
