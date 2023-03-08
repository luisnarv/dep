import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { testsFilter, clearFilter, searchFilter } from "../reducer";
import Navbar from 'react-bootstrap/Navbar'

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
    <>
      <Navbar>

      <input
        name="search"
        placeholder="Encuentra tu test"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        />
      <label htmlFor="category">filtrar por Categoria: </label>
    
        <select
          id="category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={{ marginRight: 10 }}
        >
          <option></option>
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <label htmlFor="sample" style={{ marginRight: 10 }}>filtrar por muestra: </label>
        <select
          id="sample"
          name="sample"
          value={sample}
          onChange={(event) => setSample(event.target.value)}
          style={{ marginRight: 10 }}
        >
          <option></option>
          {samples.map((sample, index) => (
            <option key={index}>{sample}</option>
          ))}
        </select>
        <button onClick={onClear}>Borrar filtros</button>
      </Navbar>
    </>
  );
}