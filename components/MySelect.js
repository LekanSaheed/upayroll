import Select from "react-select";

const MySelect = (props) => {
  return (
    <Select
      menuPortalTarget={typeof window !== "undefined" && document.body}
      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
        control: (base, state) => ({
          ...base,
          boxShadow: state.isFocused ? "0 0 1px 1px #4bc2bc" : "none",
          borderColor: state.isFocused ? "#4bc2bc" : "#ECECEC",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#4bc2bc",
        },
      })}
      {...props}
    />
  );
};

export default MySelect;
