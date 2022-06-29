import * as React from "react";
import { Form } from "react-bootstrap";

export default function SingleSelect({
  selected_tab,
  elements,
  select_title,
  setSelectedValues,
}) {
  return (
    <>
      <Form.Group className="me-3" controlId={select_title}>
        <Form.Label>{select_title}</Form.Label>
        <Form.Select aria-label="Default example">
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
