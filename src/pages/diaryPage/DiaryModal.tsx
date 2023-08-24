const DiaryModal = () => {
  return (
    <div className="diary_modal hide">
      <p className="modal_question">게시글을 삭제하시겠습니까?</p>
      <div>
        <button>취소</button>
        <button>네</button>
      </div>
    </div>
  );
};

export default DiaryModal;
