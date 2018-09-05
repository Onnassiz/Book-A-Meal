import swal from 'sweetalert';

function deleteMenu(willDelete, menu, $this) {
  if (willDelete) {
    const { deleteMenuById } = $this.props;
    deleteMenuById(menu.id).then((response) => {
      if (response.status === 200) {
        const pageMenus = $this.state.thisPageMenus.filter(x => x.id !== menu.id);
        $this.setState({ thisPageMenus: pageMenus, menuCount: $this.state.menuCount - 1 });
      }
    });
  }
}

export function toggleShowDeleteModal(menu, $this) {
  swal({
    text: 'Are you sure want to delete this menu?',
    icon: 'warning',
    dangerMode: true,
    buttons: ['Cancel', 'Delete'],
  })
    .then((willDelete) => {
      deleteMenu(willDelete, menu, $this);
    });
}

export function handlePageChange(pageNumber, mealsPagination, $this) {
  const { getUserMenus, getMeals } = $this.props;
  const offset = (pageNumber - 1) * 10;
  if (mealsPagination) {
    const mealOffset = (pageNumber - 1) * 9;
    return getMeals(9, mealOffset).then((response) => {
      if (response.status === 200) {
        $this.setState({
          mealsActivePage: pageNumber,
          meals: response.data.meals,
          mealsCount: response.data.count,
        });
        return response;
      }
    });
  }
  return getUserMenus(offset).then((response) => {
    if (response.status === 200) {
      $this.setState({ activePage: pageNumber, thisPageMenus: response.data.menus });
      return response;
    }
  });
}

function processSubmit(state, $this, formData) {
  if (!state.updateMode) {
    $this.createNewMenu(formData);
  } else {
    $this.updateExistingMenu(formData);
  }
}

export function handleSubmit(e, $this) {
  e.preventDefault();
  const { state } = $this.props;
  const formData = {
    id: state.currentMenu.id || '',
    date: $this.state.startDate || state.startDate,
    extraDays: $this.getMenuExtraDays(),
    name: $this.state.name,
    meals: $this.state.selectedMeals,
  };

  if ($this.isValid(formData)) {
    processSubmit(state, $this, formData);
  }
}

export function showOpsButtons(date) {
  const today = new Date().toISOString().split('T')[0];
  return today <= date;
}
