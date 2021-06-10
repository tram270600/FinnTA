import { useState } from 'react';

const useModalCourse = () => {
  const [isShowingCourse, setIsShowingCourse] = useState(false);
  const [isShowingConfirmTeach, setIsShowingConfirmTeach] = useState(false);

  function toggleCourse() {
    setIsShowingCourse(!isShowingCourse);
  }

  function toggleConfirmTeach() {
    setIsShowingConfirmTeach(!isShowingConfirmTeach);
  }
 
  return {
    isShowingCourse,toggleCourse,
    isShowingConfirmTeach, toggleConfirmTeach,
  }
};

export default useModalCourse;