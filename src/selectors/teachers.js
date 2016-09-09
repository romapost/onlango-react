import {createSelector} from 'reselect';

const getFilter = ({filter}) => filter;
const getPage = ({page}, {blocksOnPage = 12}) => [page, blocksOnPage];
const getList = ({list}) => list;

export const filteredTeachersList = createSelector(
  [getFilter, getPage, getList],
  (filter, [page, blocksOnPage], list) => {
    const filtered = list.filter(teacher => {
      const filterNames = Object.keys(filter);
      for (const key of filterNames) {
        if (!(key in teacher)) return false;
        else if (Array.isArray(teacher[key])) {
          if (teacher[key].indexOf(filter[key]) == -1) return false;
        }
        else if (teacher[key] != filter[key]) return false;
        else return true;
      }
      return true;
    });
    if (page * blocksOnPage > filtered.length) page = Math.ceil(filtered.length / blocksOnPage);
    return {
      list: filtered.slice((page - 1) * blocksOnPage, page * blocksOnPage),
      activePage: page,
      totalPages: Math.ceil(filtered.length / blocksOnPage)
    };
  }
);

export const languages = createSelector(
  getList,
  list => list.reduce((s, e) => {
    if (!e.languages) return s;
    for (const language of e.languages) {
      if (s.indexOf(language) == -1) s.push(language);
    }
    return s;
  }, [])
);

export const teacherInfo = createSelector(
  ({list}, {params: {id}}) => list.filter(e => e.id == id),
  ([teacher]) => teacher
);
