import React, { useState, useEffect } from 'react';

const options = [
  'Motivation', 'Milestones', 'Mindfulness',
];
function DropdownMenu(props) {
  const { postCategory, setPostCategory } = props;
  const dropdownStyles = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  };

  return (
    <div style={dropdownStyles}>
      <label>What's your vibe?</label>
      <select onChange={(event) => setPostCategory(event.target.value)} value={postCategory}>
        <option value="Motivation">Motivation</option>
        <option value="Milestones">Milestones</option>
        <option value="Mindfulness">Mindfulness</option>
      </select>

    </div>
  );
}

export default DropdownMenu;
