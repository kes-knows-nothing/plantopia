import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputForm.scss';
import SEARCH_ICON from '@/assets/images/icons/dict_search.png';

interface InputFormProps {
  nextPath: string;
  initialInput?: string;
  setReSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputForm = ({ nextPath, initialInput, setReSearch }: InputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(nextPath, {
      state: {
        inputValue: inputRef?.current?.value,
      },
    });
    setReSearch && setReSearch(prev => !prev);
  };

  return (
    <section className="search_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input_wrapper">
          <input
            ref={inputRef}
            defaultValue={initialInput}
            placeholder="식물 이름으로 검색하기"
          />
          <button>
            <img className="search_img" src={SEARCH_ICON} alt="search icon" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default InputForm;
