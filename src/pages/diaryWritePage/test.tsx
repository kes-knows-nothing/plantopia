const PhotoCounter = () => {
    return (
      <div className="photo-counter">
        <span>0</span>
        <span>/</span>
        <span>4</span>
      </div>
    );
  };
  const MainPhoto = () => {
    return <div className="main_photo hide">대표사진</div>;
  };
  
  const UploadButton = () => {
    return (
        <button className="upload_button">
          <label htmlFor="photoInput" className="photo_label">
            <TbCameraPlus className="camera_icon" />
            <PhotoCounter />
          </label>
          <input
            className="photo_input"
            id="photoInput"
            accept="image/*"
            multiple
            type="file"
          />
        </button>
    );
  };