import { Integration } from "./Integration"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"

const MockIntegration: Integration = {
  getSpotifyProfileData() {
    return Promise.resolve({
      spotify_id: "mlqeo7jnhsus5p2tks5jlxkzw",
      display_name: "Jacob Wisniewski",
      country: "AU",
      email: "jacobwisniee@gmail.com",
      spotify_profile_url: "https://open.spotify.com/user/mlqeo7jnhsus5p2tks5jlxkzw",
      profile_picture_url: null,
      followers: 0,
      spotify_account_type: "premium",
      extended_data: true
    } as SpotifyProfileResponse)
  },
  getSpotifyUserTopTracks() {
    return Promise.resolve([
      {
        id: "0kuKQQMx6L3efJuRVTgWQb",
        name: "你还要我怎样",
        url: "https://open.spotify.com/track/0kuKQQMx6L3efJuRVTgWQb",
        artists: [
          {
            id: "1cg0bYpP5e2DNG0RgK2CMN",
            name: "Joker Xue",
            url: "https://open.spotify.com/artist/1cg0bYpP5e2DNG0RgK2CMN"
          }
        ],
        album: {
          id: "6fdVEfGvTcT7TgipOorHD5",
          name: "意外",
          image: "https://i.scdn.co/image/3b02860c79e309b042df6007867617088733495c",
          url: "https://open.spotify.com/track/0kuKQQMx6L3efJuRVTgWQb"
        }
      },
      {
        id: "0VqSdtXseb9khdZrnYVyM1",
        name: "不為誰而作的歌",
        url: "https://open.spotify.com/track/0VqSdtXseb9khdZrnYVyM1",
        artists: [
          {
            id: "7Dx7RhX0mFuXhCOUgB01uM",
            name: "JJ Lin",
            url: "https://open.spotify.com/artist/7Dx7RhX0mFuXhCOUgB01uM"
          }
        ],
        album: {
          id: "2BllRBDJwm9kthtOoYTzNK",
          name: '"和自己對話" 實驗專輯',
          image: "https://i.scdn.co/image/ab67616d0000b27328c8c2fcc98775c7ea48b81c",
          url: "https://open.spotify.com/track/0VqSdtXseb9khdZrnYVyM1"
        }
      },
      {
        id: "190kU2WKyIzx9XaBjfWRPk",
        name: "修煉愛情",
        url: "https://open.spotify.com/track/190kU2WKyIzx9XaBjfWRPk",
        artists: [
          {
            id: "7Dx7RhX0mFuXhCOUgB01uM",
            name: "JJ Lin",
            url: "https://open.spotify.com/artist/7Dx7RhX0mFuXhCOUgB01uM"
          }
        ],
        album: {
          id: "6gQh7mS17suaoPKvc8gnWQ",
          name: "因你 而在",
          image: "https://i.scdn.co/image/ab67616d0000b273352fb54206892599dcfbc792",
          url: "https://open.spotify.com/track/190kU2WKyIzx9XaBjfWRPk"
        }
      },
      {
        id: "7FIWs0pqAYbP91WWM0vlTQ",
        name: "Godzilla (feat. Juice WRLD)",
        url: "https://open.spotify.com/track/7FIWs0pqAYbP91WWM0vlTQ",
        artists: [
          {
            id: "7dGJo4pcD2V6oG8kP0tJRR",
            name: "Eminem",
            url: "https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR"
          },
          {
            id: "4MCBfE4596Uoi2O4DtmEMz",
            name: "Juice WRLD",
            url: "https://open.spotify.com/artist/4MCBfE4596Uoi2O4DtmEMz"
          }
        ],
        album: {
          id: "4otkd9As6YaxxEkIjXPiZ6",
          name: "Music To Be Murdered By",
          image: "https://i.scdn.co/image/ab67616d0000b2732f44aec83b20e40f3baef73c",
          url: "https://open.spotify.com/track/7FIWs0pqAYbP91WWM0vlTQ"
        }
      },
      {
        id: "4umIPjkehX1r7uhmGvXiSV",
        name: "Intentions (feat. Quavo)",
        url: "https://open.spotify.com/track/4umIPjkehX1r7uhmGvXiSV",
        artists: [
          {
            id: "1uNFoZAHBGtllmzznpCI3s",
            name: "Justin Bieber",
            url: "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
          },
          {
            id: "0VRj0yCOv2FXJNP47XQnx5",
            name: "Quavo",
            url: "https://open.spotify.com/artist/0VRj0yCOv2FXJNP47XQnx5"
          }
        ],
        album: {
          id: "63iWSELt9V1kV6RSMxN7Ii",
          name: "Changes",
          image: "https://i.scdn.co/image/ab67616d0000b2737fe4a82a08c4f0decbeddbc6",
          url: "https://open.spotify.com/track/4umIPjkehX1r7uhmGvXiSV"
        }
      },
      {
        id: "6TodWdTSDfzwgYynTZSvJn",
        name: "Midsummer Madness",
        url: "https://open.spotify.com/track/6TodWdTSDfzwgYynTZSvJn",
        artists: [
          {
            id: "1AhjOkOLkbHUfcHDSErXQs",
            name: "88rising",
            url: "https://open.spotify.com/artist/1AhjOkOLkbHUfcHDSErXQs"
          },
          {
            id: "3MZsBdqDrRTJihTHQrO6Dq",
            name: "Joji",
            url: "https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq"
          },
          {
            id: "2IDLDx25HU1nQMKde4n61a",
            name: "Rich Brian",
            url: "https://open.spotify.com/artist/2IDLDx25HU1nQMKde4n61a"
          },
          {
            id: "07ZhipyrvoyNoJejeyM0PQ",
            name: "Higher Brothers",
            url: "https://open.spotify.com/artist/07ZhipyrvoyNoJejeyM0PQ"
          },
          {
            id: "2iB8eFB6flwQculkUrRssi",
            name: "AUGUST 08",
            url: "https://open.spotify.com/artist/2iB8eFB6flwQculkUrRssi"
          }
        ],
        album: {
          id: "6YFBWwUDdot8IjBZSYOacB",
          name: "Head In The Clouds",
          image: "https://i.scdn.co/image/ab67616d0000b2734aedbebc17bc6ebccad220e9",
          url: "https://open.spotify.com/track/6TodWdTSDfzwgYynTZSvJn"
        }
      },
      {
        id: "21jGcNKet2qwijlDFuPiPb",
        name: "Circles",
        url: "https://open.spotify.com/track/21jGcNKet2qwijlDFuPiPb",
        artists: [
          {
            id: "246dkjvS1zLTtiykXe5h60",
            name: "Post Malone",
            url: "https://open.spotify.com/artist/246dkjvS1zLTtiykXe5h60"
          }
        ],
        album: {
          id: "4g1ZRSobMefqF6nelkgibi",
          name: "Hollywood's Bleeding",
          image: "https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02",
          url: "https://open.spotify.com/track/21jGcNKet2qwijlDFuPiPb"
        }
      },
      {
        id: "3kYARoLSAvt86VFZ55BQcq",
        name: "Head In The Clouds",
        url: "https://open.spotify.com/track/3kYARoLSAvt86VFZ55BQcq",
        artists: [
          {
            id: "1AhjOkOLkbHUfcHDSErXQs",
            name: "88rising",
            url: "https://open.spotify.com/artist/1AhjOkOLkbHUfcHDSErXQs"
          },
          {
            id: "3MZsBdqDrRTJihTHQrO6Dq",
            name: "Joji",
            url: "https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq"
          }
        ],
        album: {
          id: "6YFBWwUDdot8IjBZSYOacB",
          name: "Head In The Clouds",
          image: "https://i.scdn.co/image/ab67616d0000b2734aedbebc17bc6ebccad220e9",
          url: "https://open.spotify.com/track/3kYARoLSAvt86VFZ55BQcq"
        }
      },
      {
        id: "4TwVtW8hS5LyLoDtJGpUOg",
        name: "History",
        url: "https://open.spotify.com/track/4TwVtW8hS5LyLoDtJGpUOg",
        artists: [
          {
            id: "1AhjOkOLkbHUfcHDSErXQs",
            name: "88rising",
            url: "https://open.spotify.com/artist/1AhjOkOLkbHUfcHDSErXQs"
          },
          {
            id: "2IDLDx25HU1nQMKde4n61a",
            name: "Rich Brian",
            url: "https://open.spotify.com/artist/2IDLDx25HU1nQMKde4n61a"
          }
        ],
        album: {
          id: "6YFBWwUDdot8IjBZSYOacB",
          name: "Head In The Clouds",
          image: "https://i.scdn.co/image/ab67616d0000b2734aedbebc17bc6ebccad220e9",
          url: "https://open.spotify.com/track/4TwVtW8hS5LyLoDtJGpUOg"
        }
      },
      {
        id: "6PzOPrXx8tJEqace76yrv2",
        name: "E.T.A.",
        url: "https://open.spotify.com/track/6PzOPrXx8tJEqace76yrv2",
        artists: [
          {
            id: "1uNFoZAHBGtllmzznpCI3s",
            name: "Justin Bieber",
            url: "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
          }
        ],
        album: {
          id: "63iWSELt9V1kV6RSMxN7Ii",
          name: "Changes",
          image: "https://i.scdn.co/image/ab67616d0000b2737fe4a82a08c4f0decbeddbc6",
          url: "https://open.spotify.com/track/6PzOPrXx8tJEqace76yrv2"
        }
      },
      {
        id: "4h8VwCb1MTGoLKueQ1WgbD",
        name: "Wake Me Up",
        url: "https://open.spotify.com/track/4h8VwCb1MTGoLKueQ1WgbD",
        artists: [
          {
            id: "1vCWHaC5f2uS3yhpwWbIA6",
            name: "Avicii",
            url: "https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6"
          }
        ],
        album: {
          id: "1s9tU91VJt4sU5owi29GD3",
          name: "True",
          image: "https://i.scdn.co/image/ab67616d0000b2734cfcceb6f9b1aae8752810e7",
          url: "https://open.spotify.com/track/4h8VwCb1MTGoLKueQ1WgbD"
        }
      },
      {
        id: "1ZLrDPgR7mvuTco3rQK8Pk",
        name: "Way Back Home (feat. Conor Maynard) - Sam Feldt Edit",
        url: "https://open.spotify.com/track/1ZLrDPgR7mvuTco3rQK8Pk",
        artists: [
          {
            id: "72nLe76yBFSlP6VBzME358",
            name: "SHAUN",
            url: "https://open.spotify.com/artist/72nLe76yBFSlP6VBzME358"
          },
          {
            id: "6mU8ucezzms5I2kNH6HNlu",
            name: "Conor Maynard",
            url: "https://open.spotify.com/artist/6mU8ucezzms5I2kNH6HNlu"
          },
          {
            id: "20gsENnposVs2I4rQ5kvrf",
            name: "Sam Feldt",
            url: "https://open.spotify.com/artist/20gsENnposVs2I4rQ5kvrf"
          }
        ],
        album: {
          id: "13aeLAMXve4Jxd8mNKu068",
          name: "Way Back Home (feat. Conor Maynard) [Sam Feldt Edit]",
          image: "https://i.scdn.co/image/ab67616d0000b27391994452af66b672954b6eb4",
          url: "https://open.spotify.com/track/1ZLrDPgR7mvuTco3rQK8Pk"
        }
      },
      {
        id: "2MsNSKQNQNRklkKFxxvIav",
        name: "9 and Three Quarters (Run Away)",
        url: "https://open.spotify.com/track/2MsNSKQNQNRklkKFxxvIav",
        artists: [
          {
            id: "0ghlgldX5Dd6720Q3qFyQB",
            name: "TOMORROW X TOGETHER",
            url: "https://open.spotify.com/artist/0ghlgldX5Dd6720Q3qFyQB"
          }
        ],
        album: {
          id: "5KoR6s906nbO21C9ZPdwTv",
          name: "The Dream Chapter: MAGIC",
          image: "https://i.scdn.co/image/ab67616d0000b2736207621becafe079ec6c9185",
          url: "https://open.spotify.com/track/2MsNSKQNQNRklkKFxxvIav"
        }
      },
      {
        id: "1Q2VVCIdCDaxxk6Y1S6qxU",
        name: "認真的雪",
        url: "https://open.spotify.com/track/1Q2VVCIdCDaxxk6Y1S6qxU",
        artists: [
          {
            id: "1cg0bYpP5e2DNG0RgK2CMN",
            name: "Joker Xue",
            url: "https://open.spotify.com/artist/1cg0bYpP5e2DNG0RgK2CMN"
          }
        ],
        album: {
          id: "55B5OUbL4LvQm7mAnStbPR",
          name: "薛之謙",
          image: "https://i.scdn.co/image/ab67616d0000b2737824a659703e8e6fb81058d0",
          url: "https://open.spotify.com/track/1Q2VVCIdCDaxxk6Y1S6qxU"
        }
      },
      {
        id: "41L3O37CECZt3N7ziG2z7l",
        name: "Yummy",
        url: "https://open.spotify.com/track/41L3O37CECZt3N7ziG2z7l",
        artists: [
          {
            id: "1uNFoZAHBGtllmzznpCI3s",
            name: "Justin Bieber",
            url: "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
          }
        ],
        album: {
          id: "1SN6N3fNkZk5oXQ9X46QZ3",
          name: "Yummy",
          image: "https://i.scdn.co/image/ab67616d0000b27360eec5a0953d4a33d77ed71d",
          url: "https://open.spotify.com/track/41L3O37CECZt3N7ziG2z7l"
        }
      },
      {
        id: "70H7igMoR8VWGbqAEEYRHA",
        name: "Head High",
        url: "https://open.spotify.com/track/70H7igMoR8VWGbqAEEYRHA",
        artists: [
          {
            id: "7k73EtZwoPs516ZxE72KsO",
            name: "ONE OK ROCK",
            url: "https://open.spotify.com/artist/7k73EtZwoPs516ZxE72KsO"
          }
        ],
        album: {
          id: "1obI3635eoYwWYhGs2vEeP",
          name: "Eye of the Storm",
          image: "https://i.scdn.co/image/ab67616d0000b273794179deeade79ef08eabd94",
          url: "https://open.spotify.com/track/70H7igMoR8VWGbqAEEYRHA"
        }
      },
      {
        id: "0YAMQSmHk6BSUGTYpaoqTJ",
        name: "Wherever you are",
        url: "https://open.spotify.com/track/0YAMQSmHk6BSUGTYpaoqTJ",
        artists: [
          {
            id: "7k73EtZwoPs516ZxE72KsO",
            name: "ONE OK ROCK",
            url: "https://open.spotify.com/artist/7k73EtZwoPs516ZxE72KsO"
          }
        ],
        album: {
          id: "4OKBuE9F8MTCV7nnsBRcsK",
          name: "Niche Syndrome",
          image: "https://i.scdn.co/image/ab67616d0000b2733e4b149dd3110f1432bfeca0",
          url: "https://open.spotify.com/track/0YAMQSmHk6BSUGTYpaoqTJ"
        }
      },
      {
        id: "7GQrJ7m97MGjyQattLABVP",
        name: "Getting Over You - R3HAB Remix",
        url: "https://open.spotify.com/track/7GQrJ7m97MGjyQattLABVP",
        artists: [
          {
            id: "5JZ7CnR6gTvEMKX4g70Amv",
            name: "Lauv",
            url: "https://open.spotify.com/artist/5JZ7CnR6gTvEMKX4g70Amv"
          },
          {
            id: "6cEuCEZu7PAE9ZSzLLc2oQ",
            name: "R3HAB",
            url: "https://open.spotify.com/artist/6cEuCEZu7PAE9ZSzLLc2oQ"
          }
        ],
        album: {
          id: "5ge6i2NdRMK8XM8Lb9eUDe",
          name: "I met you when I was 18. (the extras)",
          image: "https://i.scdn.co/image/ab67616d0000b273c875d03de5a9bfd2d435d261",
          url: "https://open.spotify.com/track/7GQrJ7m97MGjyQattLABVP"
        }
      },
      {
        id: "34mRQFXVDXFdZz3pqddU7x",
        name: "演员",
        url: "https://open.spotify.com/track/34mRQFXVDXFdZz3pqddU7x",
        artists: [
          {
            id: "1cg0bYpP5e2DNG0RgK2CMN",
            name: "Joker Xue",
            url: "https://open.spotify.com/artist/1cg0bYpP5e2DNG0RgK2CMN"
          }
        ],
        album: {
          id: "0TeXupbi7iHsap7NQGavzN",
          name: "绅士",
          image: "https://i.scdn.co/image/ab67616d0000b2739d57627ae9b79969a5d87f29",
          url: "https://open.spotify.com/track/34mRQFXVDXFdZz3pqddU7x"
        }
      },
      {
        id: "3CyCjgTHFzqucmECajq8QA",
        name: "DUN DUN",
        url: "https://open.spotify.com/track/3CyCjgTHFzqucmECajq8QA",
        artists: [
          {
            id: "3ZZzT0naD25RhY2uZvIKkJ",
            name: "EVERGLOW",
            url: "https://open.spotify.com/artist/3ZZzT0naD25RhY2uZvIKkJ"
          }
        ],
        album: {
          id: "5ByQ39IHGxrddAwQcnxvoj",
          name: "reminiscence",
          image: "https://i.scdn.co/image/ab67616d0000b273871918597ebfbe6bc594ab44",
          url: "https://open.spotify.com/track/3CyCjgTHFzqucmECajq8QA"
        }
      },
      {
        id: "632VyMrvhsHIsO4zq9khts",
        name: "她說",
        url: "https://open.spotify.com/track/632VyMrvhsHIsO4zq9khts",
        artists: [
          {
            id: "7Dx7RhX0mFuXhCOUgB01uM",
            name: "JJ Lin",
            url: "https://open.spotify.com/artist/7Dx7RhX0mFuXhCOUgB01uM"
          }
        ],
        album: {
          id: "2jzTdhgI2kvDx6NerFsRe8",
          name: "她說",
          image: "https://i.scdn.co/image/ab67616d0000b2731e7c1f167d1a6fdd2d8cab10",
          url: "https://open.spotify.com/track/632VyMrvhsHIsO4zq9khts"
        }
      },
      {
        id: "4koDrJbYxIlcDY4gu2a4I8",
        name: "WHO DO U LOVE? (feat. French Montana)",
        url: "https://open.spotify.com/track/4koDrJbYxIlcDY4gu2a4I8",
        artists: [
          {
            id: "4TnGh5PKbSjpYqpIdlW5nz",
            name: "Monsta X",
            url: "https://open.spotify.com/artist/4TnGh5PKbSjpYqpIdlW5nz"
          },
          {
            id: "6vXTefBL93Dj5IqAWq6OTv",
            name: "French Montana",
            url: "https://open.spotify.com/artist/6vXTefBL93Dj5IqAWq6OTv"
          }
        ],
        album: {
          id: "2O5KXxROQOR8WOdB8fgTCp",
          name: "ALL ABOUT LUV",
          image: "https://i.scdn.co/image/ab67616d0000b273ffe04004d1e5636faa06763a",
          url: "https://open.spotify.com/track/4koDrJbYxIlcDY4gu2a4I8"
        }
      },
      {
        id: "7qEHsqek33rTcFNT9PFqLf",
        name: "Someone You Loved",
        url: "https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf",
        artists: [
          {
            id: "4GNC7GD6oZMSxPGyXy4MNB",
            name: "Lewis Capaldi",
            url: "https://open.spotify.com/artist/4GNC7GD6oZMSxPGyXy4MNB"
          }
        ],
        album: {
          id: "5658aM19fA3JVwTK6eQX70",
          name: "Divinely Uninspired To A Hellish Extent",
          image: "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
          url: "https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf"
        }
      },
      {
        id: "4f3nDjgqXurMryYBSp0TZD",
        name: "The Beginning",
        url: "https://open.spotify.com/track/4f3nDjgqXurMryYBSp0TZD",
        artists: [
          {
            id: "7k73EtZwoPs516ZxE72KsO",
            name: "ONE OK ROCK",
            url: "https://open.spotify.com/artist/7k73EtZwoPs516ZxE72KsO"
          }
        ],
        album: {
          id: "5dWke9BKYdBq7YXbb7jrLC",
          name: "JINSEI KAKETE BOKU WA",
          image: "https://i.scdn.co/image/ab67616d0000b273cff66b3375bbeb03c6c214a0",
          url: "https://open.spotify.com/track/4f3nDjgqXurMryYBSp0TZD"
        }
      },
      {
        id: "2c37Gkpu75l3kvh1FUZrHV",
        name: "All I Wanna Do (feat. Hoody & 로꼬 Loco) [Korean Version]",
        url: "https://open.spotify.com/track/2c37Gkpu75l3kvh1FUZrHV",
        artists: [
          {
            id: "4XDi67ZENZcbfKnvMnTYsI",
            name: "Jay Park",
            url: "https://open.spotify.com/artist/4XDi67ZENZcbfKnvMnTYsI"
          },
          {
            id: "7lXgbtBDcCRbfc5f8FhGUL",
            name: "Hoody",
            url: "https://open.spotify.com/artist/7lXgbtBDcCRbfc5f8FhGUL"
          },
          {
            id: "2e4G04F77jxVuDYo44TCSm",
            name: "Loco",
            url: "https://open.spotify.com/artist/2e4G04F77jxVuDYo44TCSm"
          }
        ],
        album: {
          id: "1sFTg2NpMmaevHohz4gPCE",
          name: "Everything You Wanted",
          image: "https://i.scdn.co/image/ab67616d0000b273905c1c7814f75f67d31942d9",
          url: "https://open.spotify.com/track/2c37Gkpu75l3kvh1FUZrHV"
        }
      }
    ])
  }
}

export default MockIntegration
