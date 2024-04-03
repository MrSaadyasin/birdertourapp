import React from "react";
import { Controller } from "react-hook-form";
import { FormGroup, Row } from "react-bootstrap";
import Image from "next/image";
const TextareaInput = ({
  control,
  rules = {},
  className,
  name,
  placeholder,
  type,
  style,
  as,
  hideIcon,
  showIcon,
  icon,
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <textarea
              as={as}
              className={className}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              style={style}
              placeholder={placeholder}
              type={type}
            ></textarea>
            {icon && (
              <div
                className="input-group-append align-items-end "
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                }}>
                <button
                  className="btn btn-sm btn-link pb-0"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  <Image
                    width="18"
                    src={!showPassword ? showIcon : hideIcon}
                    alt="icon"
                  />
                </button>
              </div>
            )}
            {error && <p className="text-danger mx-1 my-1">{error.message}</p>}
          </>
        )}
      />
    </>
  );
};
export default TextareaInput;