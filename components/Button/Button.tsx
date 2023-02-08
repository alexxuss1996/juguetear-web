import Image from "next/image";
import React, { MouseEventHandler } from "react";
interface Appearance {
  link: string;
  buttonWithIcon: string;
  button: string;
}

const BASE_STYLE =
  "font-extrabold rounded focus-within:shadow-md shadow-turquoise text-lg font-outfit";

const BASE_STYLE_LINK =
  "py-1 px-2 text-blue hover:text-orange focus:text-blue underline";

const APPEARANCE: Appearance = {
  link: `${BASE_STYLE} ${BASE_STYLE_LINK}`,
  buttonWithIcon: `${BASE_STYLE} flex items-center ${BASE_STYLE_LINK}`,
  button: `${BASE_STYLE} bg-orange hover:bg-blue focus:bg-orange  py-4 px-8 text-white `,
};

type Appearances = keyof Appearance;

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
  appearance: Appearances;
  handleClick?: MouseEventHandler;
  buttonAttributes?: Partial<HTMLButtonElement>;
  icon?: string;
  text: string;
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const { appearance, text, disabled, icon, handleClick, ...rest } = props;
  const getAppearance = (appearance: Appearances): string => {
    if (disabled) {
      return `${APPEARANCE[appearance]} cursor-not-allowed disabled:opacity-25`;
    }
    return APPEARANCE[appearance];
  };

  return (
    <button
      disabled={disabled}
      className={getAppearance(appearance)}
      onClick={handleClick}
      {...rest}
    >
      {icon && (
        <div className="pr-3">
          <Image src={icon} alt="SVG" width={27} height={35} />
        </div>
      )}
      {text}
    </button>
  );
};
