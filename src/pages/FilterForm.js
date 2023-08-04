import { useState } from "react";

function FilterForm({ setDisplayPosts, setFilterFormVisible }) {
  const [date, setDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setFilterFormVisible(false);

    setDisplayPosts((c) => {
      return c.filter((elm) => {
        let date1 = new Date(elm.publishTime);
        let date2 = new Date(date);
        console.log(date1, date2);
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      });
    });
  }

  return (
    <div className="FilterForm">
      <div className="FilterFormOverlay overlay">
        <form id="form_filter" onSubmit={handleSubmit}>
          <label for="form_filter_Date">Search Date</label>
          <input
            type="date"
            name="form_filter_Date"
            class="form_filter_Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default FilterForm;
