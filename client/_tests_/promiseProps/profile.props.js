import profile from '../objectProps/profile.props';

export const getProfile = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: profile,
  });
});

export const updateProfile = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: profile,
  });
});

export const postProfile = () => new Promise((resolve) => {
  resolve({
    status: 201,
    data: profile,
  });
});

