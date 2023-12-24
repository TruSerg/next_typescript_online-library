import { FC } from "react";

import style from "./styles.module.scss";

interface FormFieldErrorAreaProps {
  title: string;
}

const FormFieldErrorArea: FC<FormFieldErrorAreaProps> = ({ title }) => {
  return <span className={style.text}>{title}</span>;
};

export default FormFieldErrorArea;
