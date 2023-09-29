import {MDBBtn} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  fetchLanguages,
  fetchsuwar,
  fetchRiwayat,
  fetchMoshaf,
  fetchReciters
} from "../redux/reducers/quran";
import { useDispatch, useSelector } from "react-redux";
import Api from "../config/api";

const FormData = () => {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.quran.data);
  const suwar = useSelector((state) => state.quran.suwar);
  const riwayat = useSelector((state) => state.quran.riwayat);
  const moshaf = useSelector((state) => state.quran.moshaf);
  const reciters = useSelector((state) => state.quran.reciters);
 

  const [inputs, setInputs] = useState({
    language: "",
    suwar: "",
    riwayat: "",
    moshaf: "",
    reciters :""
  });
  const handleChanges = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    dispatch(fetchLanguages());
    dispatch(fetchsuwar());
    dispatch(fetchRiwayat());
    dispatch(fetchMoshaf());
    dispatch(fetchReciters());
  }, [dispatch]);

  console.log(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Api.get(`/reciters?language=${inputs.language}&rewaya=${inputs.riwayat}&reciter=${inputs.reciters}`)
        .then((res) => {
          const ext = inputs.suwar.toString().padStart(3, '0')+'.mp3'
          const sura = res.data.reciters[0].moshaf[0].server+ext
          window.location.href=sura;
         
        })
        .catch((err) => {
          const errorMsg =
            err?.response?.data?.message || err?.response?.data?.error;
          console.log(errorMsg);
        });
    } catch (err) {
      console.log();(err);
    }
  };
  return (
    <form style={{marginTop:70}}>
      <Form.Select
        value={inputs.language}
        id="form1Example4"
        className="my-4"
        name="language"
        onChange={handleChanges}
      >
        {languages?.language?.map((ele) => {
          return (
            <>
              <option hidden>أختار اللغه</option>
              <option key={ele.id} value={ele.id}>{ele.native}</option>
            </>
          );
        })}
      </Form.Select>

      <Form.Select
        value={inputs.suwar}
        id="form1Example5"
        className="my-4"
        name="suwar"
        onChange={handleChanges}
      >
        {suwar?.suwar?.map((ele) => {
          return (
            <>
              <option hidden>أختار اسم السوره</option>
              <option key={ele.id} value={ele.id}>{ele.name}</option>
            </>
          );
        })}
      </Form.Select>
      <Form.Select
        value={inputs.riwayat}
        id="form1Example6"
        className="my-4"
        name="riwayat"
        onChange={handleChanges}
      >
        {riwayat?.riwayat?.map((ele) => {
          return (
            <>
              <option hidden>أختار الروايه </option>
              <option key={ele.id} value={ele.id}>{ele.name}</option>
            </>
          );
        })}
      </Form.Select>

      <Form.Select
        value={inputs.moshaf}
        id="form1Example7"
        className="my-4"
        name="moshaf"
        onChange={handleChanges}
      >
        {moshaf?.map((ele) => {
          return (
            <>
              <option hidden>أختار المصخف </option>
              <option key={ele.id} value={ele.id}>{ele.name}</option>
            </>
          );
        })}
      </Form.Select>
     
      <Form.Select
        value={inputs.reciters}
        id="form1Example8"
        className="my-4"
        name="reciters"
        onChange={handleChanges}
      >
        {
        reciters?.reciters?.map((ele) => {
          return (
            <>
              <option hidden>أختار القارئ </option>
              <option key={ele.id} value={ele.id}>{ele.name}</option>
            </>
          )})
          }
      </Form.Select>
          
      <MDBBtn onClick={handleSubmit} type="submit" block>
        Submit
      </MDBBtn>
    </form>
  );
};

export default FormData;

//https://mp3quran.net/ar/ahmad_huth/1