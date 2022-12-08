import React, { useImperativeHandle, useRef } from 'react';


const FancyInput = React.forwardRef(function FancyInput(props: {}, ref: React.Ref<unknown> | undefined) {
  const inputRef = useRef<HTMLInputElement>(null!);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current.focus();
      }
    };
  });

  return <input ref={inputRef} type={'password'} />;
});

export default function ImperitiveHandleDemo() {
  const fancyInputRef = useRef<HTMLInputElement>(null!);

  return <>
    <h2>Hook: Fancy Input</h2>
    <div>
      <button onClick={() => {
        fancyInputRef.current.focus();
      }}>focus
      </button>
      <FancyInput ref={fancyInputRef} />
    </div>
  </>;


}
