import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputFormProps } from '@/@types/dictionary';
import SEARCH_ICON from '@/assets/images/icons/dict_search.png';
import './inputForm.scss';

const InputForm = ({
  nextPath,
  initialInput,
  updateInputValue,
}: InputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(nextPath, {
      state: {
        inputValue: inputRef?.current?.value,
      },
    });
    updateInputValue && updateInputValue(inputRef?.current?.value);
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
