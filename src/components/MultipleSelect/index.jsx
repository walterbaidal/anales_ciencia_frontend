import * as React from "react";
import { Form } from "react-bootstrap";

export default function MultipleSelect({
  selected_tab,
  elements,
  select_title,
  selectedValues,
  setSelectedValues,
  print_element,
}) {
  const handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedValues(value);
  };
  return (
    <>
      <Form.Group className="me-3" controlId={select_title}>
        <Form.Label>{select_title}</Form.Label>
        <Form.Select
          multiple
          aria-label="Default select example"
          onChange={handleChange}
          defaultValue={
            print_element ? selectedValues.map((value) => value.id) : " "
          }
        >
          {elements.map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
}
