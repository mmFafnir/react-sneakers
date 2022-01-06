import React from 'react';
import contentScss from "../scss/content.scss";
import Card from "../components/Card";

function Home({
  loading,
  data,
  error
}) {

 

  //поиск
  const [searchValue, setSearchValue] = React.useState('');

  //меняю значение поиска
  const onChangeInput = (event) => {
    setSearchValue(event.target.value)
  };
  const filtreditems = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );



  return(
    <div className="content">
      <div className="content__header">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="content__search">
            <i className="fas fa-search"></i>
            <input
            onChange={onChangeInput}
            value={searchValue}
            type="text"
            name="search"
            placeholder="Поиск..."/>
          </div>
       </div>
      <div className="content__body">
          {
            (loading ? [...Array(8)] : filtreditems).map((item, index) => (
              <Card
              key={item ? item.parenId : index}
              loading={loading}
              {...item}
              />
            ))
          }
        </div>
    </div>

  )
}
export default Home;
