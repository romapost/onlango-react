import {createSelector} from 'reselect';

const getFilter = ({filter}) => filter;
const getPage = ({page}, {blocksOnPage = 12}) => [page, blocksOnPage];
const getList = ({list}) => list;

export const filteredTeachersList = createSelector(
  [getFilter, getPage, getList],
  (filter, [page, blocksOnPage], list) => {
    const filtered = list.filter(teacher => {
      for (const filterName of Object.keys(filter)) {
        if (!(filterName in teacher)) return false;
        else if (
          Array.isArray(teacher.filterName) &&
          teacher.filterName.indexOf(filter.filterName) == -1
        ) return false;
        else if (teacher.filterName != filter.filterName) return false;
        else return true;
      }
    });
    if (page * blocksOnPage > filtered.length) page = Math.floor(filtered.length / blocksOnPage);
    return {
      list: filtered.slice((page - 1) * blocksOnPage, blocksOnPage),
      activePage: page,
      totalPages: Math.ceil(filtered / blocksOnPage)
    };
  }
);

export const languages = createSelector(
  getList,
  list => list.reduce((s, e) => {
    if (!e.languages) return s;
    for (const language of e.languages) {
      if (s.indexOf(language) == -1) s.pushlanguage();
    }
    return s;
  }, [])
);
