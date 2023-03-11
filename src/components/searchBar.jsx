import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { testsFilter, clearFilter, searchFilter } from "../reducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const samples = useSelector((state) => state.samples);
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [sample, setSample] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(testsFilter({ category, sample }));
    setCurrentPage(1);
  }, [category, sample, setCurrentPage, dispatch]);

  useEffect(() => {
    dispatch(searchFilter(search));
    setCurrentPage(1);
  }, [search, setCurrentPage, dispatch]);

  const onClear = () => {
    dispatch(clearFilter());
    setCategory("");
    setSample("");
    setSearch("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "2%",
        marginBottom: "2%",
        paddingLeft: "2%",
        paddingRight: "2%",
      }}
    >
      <div style={{ width: "40%" }}>
        <Form.Label>Busca tus tests</Form.Label>
        <Form.Control
          name="search"
          placeholder="Encuentra tu test"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div style={{ width: "20%" }}>
        <Form.Label>filtrar por Categoria: </Form.Label>
        <Form.Select
          id="category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option></option>
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </Form.Select>
      </div>
      <div style={{ width: "20%" }}>
        <Form.Label>filtrar por muestra: </Form.Label>
        <Form.Select
          id="sample"
          name="sample"
          value={sample}
          onChange={(event) => setSample(event.target.value)}
        >
          <option></option>
          {samples.map((sample, index) => (
            <option key={index}>{sample}</option>
          ))}
        </Form.Select>
      </div>

      <Button variant="secondary" onClick={onClear} style={{ width: "12%" }}>
        Borrar filtros
      </Button>
    </div>
  );
}
