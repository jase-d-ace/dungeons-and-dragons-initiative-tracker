import axios from 'axios';

class Services {
  authenticate(person, url) {
    return axios({
      method: 'POST',
      url,
      data: {
        name: person.name.toLowerCase(),
        password: person.password
      }
    });
  };

  setCharacter() {
    return axios.get('/api/characters')
  };
};

export default new Services();
