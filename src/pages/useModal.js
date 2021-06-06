import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const [isShowingProfile, setIsShowingProfile] = useState(false);
  const [isShowingBook, setIsShowingBook] = useState(false);
  const [isShowingRate, setIsShowingRate] = useState(false);
  const [isShowingViewRate, setIsShowingViewRate] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggleCreate() {
    setIsShowingCreate(!isShowingCreate);
  }
  function toggleProfile() {
    setIsShowingProfile(!isShowingProfile);
  }
  function toggleBook() {
    setIsShowingBook(!isShowingBook);
  }
  function toggleRate() {
    setIsShowingRate(!isShowingRate);
  }
  function toggleViewRate() {
    setIsShowingViewRate(!isShowingViewRate);
  }
  return {
    isShowing,toggle,
    isShowingCreate,toggleCreate,
    isShowingProfile,toggleProfile,
    isShowingBook, toggleBook,
    isShowingRate, toggleRate,
    isShowingViewRate, toggleViewRate,
  }
};

export default useModal;