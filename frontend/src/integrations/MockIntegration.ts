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
        id: "79esEXlqqmq0GPz0xQSZTV",
        name: "Lost In Japan",
        url: "https://open.spotify.com/track/79esEXlqqmq0GPz0xQSZTV",
        artists: [
          {
            id: "7n2wHs1TKAczGzO7Dd2rGr",
            name: "Shawn Mendes",
            url: "https://open.spotify.com/artist/7n2wHs1TKAczGzO7Dd2rGr"
          }
        ],
        album: {
          id: "2VP96XdMOKTXefI8Nui23s",
          name: "Shawn Mendes",
          image: "https://i.scdn.co/image/ab67616d0000b273269423eb6467e308c0fbce24",
          url: "https://open.spotify.com/track/79esEXlqqmq0GPz0xQSZTV"
        }
      },
      {
        id: "6IC8XS2naC74iPMelIiHDX",
        name: "Solitude",
        url: "https://open.spotify.com/track/6IC8XS2naC74iPMelIiHDX",
        artists: [
          {
            id: "343GcK7dJojtPVaKZFUt4a",
            name: "Yung Vatorè",
            url: "https://open.spotify.com/artist/343GcK7dJojtPVaKZFUt4a"
          },
          {
            id: "3BoSEarTgKiw8sHE0ixJNK",
            name: "Nymano",
            url: "https://open.spotify.com/artist/3BoSEarTgKiw8sHE0ixJNK"
          }
        ],
        album: {
          id: "14EEB01sRv855xEIDpiHOE",
          name: "Solitude",
          image: "https://i.scdn.co/image/ab67616d0000b273e696b416a40fc51f9e4ff822",
          url: "https://open.spotify.com/track/6IC8XS2naC74iPMelIiHDX"
        }
      },
      {
        id: "3TkhrMHmL5svNsVIzHVDwV",
        name: "Don't Think About Tomorrow.",
        url: "https://open.spotify.com/track/3TkhrMHmL5svNsVIzHVDwV",
        artists: [
          {
            id: "6psQOFgr41pQ2CiL2CCi47",
            name: "fantompower",
            url: "https://open.spotify.com/artist/6psQOFgr41pQ2CiL2CCi47"
          }
        ],
        album: {
          id: "08scJWiEuLoGdLQWpIhW0z",
          name: "Summertime and the Living's Easier.",
          image: "https://i.scdn.co/image/ab67616d0000b273b16bae8cc305c51a67158fe2",
          url: "https://open.spotify.com/track/3TkhrMHmL5svNsVIzHVDwV"
        }
      },
      {
        id: "29qRus5o06Yd9dChBvL8xk",
        name: "Bright Side",
        url: "https://open.spotify.com/track/29qRus5o06Yd9dChBvL8xk",
        artists: [
          {
            id: "4Q10j25ITsKQZ1tGd7g8N4",
            name: "Off the Jump",
            url: "https://open.spotify.com/artist/4Q10j25ITsKQZ1tGd7g8N4"
          }
        ],
        album: {
          id: "0KqGooA0diXMBHJhxCaApu",
          name: "High Beams",
          image: "https://i.scdn.co/image/ab67616d0000b2737b2b2ab45c9e054c2c4c6093",
          url: "https://open.spotify.com/track/29qRus5o06Yd9dChBvL8xk"
        }
      },
      {
        id: "2itR8VHeTVKInnMPec8mj8",
        name: "Lost in You",
        url: "https://open.spotify.com/track/2itR8VHeTVKInnMPec8mj8",
        artists: [
          {
            id: "0lawSNBxNgJFQYJnQzLH8c",
            name: "khai dreams",
            url: "https://open.spotify.com/artist/0lawSNBxNgJFQYJnQzLH8c"
          }
        ],
        album: {
          id: "3SHj2Ioa63Po4y7hBELWHe",
          name: "Lost in You",
          image: "https://i.scdn.co/image/ab67616d0000b273bc5d21f3beaa22dc87345eeb",
          url: "https://open.spotify.com/track/2itR8VHeTVKInnMPec8mj8"
        }
      },
      {
        id: "3QAUNnA3EX0NY0g2xpHeAg",
        name: "Thoughts",
        url: "https://open.spotify.com/track/3QAUNnA3EX0NY0g2xpHeAg",
        artists: [
          {
            id: "4QIEBY6nJVpfEorEDMenAH",
            name: "Whxami",
            url: "https://open.spotify.com/artist/4QIEBY6nJVpfEorEDMenAH"
          }
        ],
        album: {
          id: "6rpnIk18kCO2AuozsxrANq",
          name: "Thoughts",
          image: "https://i.scdn.co/image/ab67616d0000b2733580b18b6927ba630e0734dd",
          url: "https://open.spotify.com/track/3QAUNnA3EX0NY0g2xpHeAg"
        }
      },
      {
        id: "5uWDUe75h2FHLZyMX9r5sp",
        name: "Sunkissed",
        url: "https://open.spotify.com/track/5uWDUe75h2FHLZyMX9r5sp",
        artists: [
          {
            id: "0lawSNBxNgJFQYJnQzLH8c",
            name: "khai dreams",
            url: "https://open.spotify.com/artist/0lawSNBxNgJFQYJnQzLH8c"
          }
        ],
        album: {
          id: "6Y1JQjug6lXx2hbbpN86RM",
          name: "Sunkissed",
          image: "https://i.scdn.co/image/ab67616d0000b2731221c6ff9a3e3c6f6840c0a5",
          url: "https://open.spotify.com/track/5uWDUe75h2FHLZyMX9r5sp"
        }
      },
      {
        id: "7FQHAI5DHfUSvQHoVbuB33",
        name: "breakfast",
        url: "https://open.spotify.com/track/7FQHAI5DHfUSvQHoVbuB33",
        artists: [
          {
            id: "5XE0fiZWGbq9TcSuWwJ1fA",
            name: "potsu",
            url: "https://open.spotify.com/artist/5XE0fiZWGbq9TcSuWwJ1fA"
          },
          {
            id: "4WMvqyhx0a3HOL2oPHFM4p",
            name: "lando!",
            url: "https://open.spotify.com/artist/4WMvqyhx0a3HOL2oPHFM4p"
          }
        ],
        album: {
          id: "3KhWKpMZbfX9Bd08AFMnGo",
          name: "breakfast",
          image: "https://i.scdn.co/image/ab67616d0000b27378a9383f1aea86cfbc39efa9",
          url: "https://open.spotify.com/track/7FQHAI5DHfUSvQHoVbuB33"
        }
      },
      {
        id: "4YJTa4kAergUU0fKyCIpkK",
        name: "Post Success Depression",
        url: "https://open.spotify.com/track/4YJTa4kAergUU0fKyCIpkK",
        artists: [
          {
            id: "4uFZsG1vXrPcvnZ4iSQyrx",
            name: "C418",
            url: "https://open.spotify.com/artist/4uFZsG1vXrPcvnZ4iSQyrx"
          }
        ],
        album: {
          id: "5P6bUwmfCbLIL01nYLHHgQ",
          name: "One",
          image: "https://i.scdn.co/image/ab67616d0000b273b71f70ce691e21b806b9edd6",
          url: "https://open.spotify.com/track/4YJTa4kAergUU0fKyCIpkK"
        }
      },
      {
        id: "1SbMoPxVg1vZJw2w8YVoKq",
        name: "I DON'T CARE",
        url: "https://open.spotify.com/track/1SbMoPxVg1vZJw2w8YVoKq",
        artists: [
          {
            id: "3zz52ViyCBcplK0ftEVPSS",
            name: "Quadeca",
            url: "https://open.spotify.com/artist/3zz52ViyCBcplK0ftEVPSS"
          }
        ],
        album: {
          id: "76ZwFURbA5zfMW75pRSvrv",
          name: "I DON'T CARE",
          image: "https://i.scdn.co/image/ab67616d0000b2736d3655b5a1e1f01eef00a48f",
          url: "https://open.spotify.com/track/1SbMoPxVg1vZJw2w8YVoKq"
        }
      },
      {
        id: "5tFYrhu8y42aQ0fUJFyYjJ",
        name: "~ghosted~",
        url: "https://open.spotify.com/track/5tFYrhu8y42aQ0fUJFyYjJ",
        artists: [
          {
            id: "4WMvqyhx0a3HOL2oPHFM4p",
            name: "lando!",
            url: "https://open.spotify.com/artist/4WMvqyhx0a3HOL2oPHFM4p"
          },
          {
            id: "6NLqFFCoVnFwbXzoIB5Col",
            name: "lofi.samurai",
            url: "https://open.spotify.com/artist/6NLqFFCoVnFwbXzoIB5Col"
          }
        ],
        album: {
          id: "4E69TFknRkAA9L3RJemfaY",
          name: "~ghosted~",
          image: "https://i.scdn.co/image/ab67616d0000b2731c7fefc8747982b4d631385a",
          url: "https://open.spotify.com/track/5tFYrhu8y42aQ0fUJFyYjJ"
        }
      },
      {
        id: "72542euQT9wECESPCIKSXS",
        name: "Life Is Changing",
        url: "https://open.spotify.com/track/72542euQT9wECESPCIKSXS",
        artists: [
          {
            id: "6bmlMHgSheBauioMgKv2tn",
            name: "Powfu",
            url: "https://open.spotify.com/artist/6bmlMHgSheBauioMgKv2tn"
          },
          {
            id: "2K1mi1jBq5fq3TxtQ09Wvv",
            name: "raynadayz",
            url: "https://open.spotify.com/artist/2K1mi1jBq5fq3TxtQ09Wvv"
          },
          {
            id: "263czpX1R1DRptGohAr6i8",
            name: "kinshii",
            url: "https://open.spotify.com/artist/263czpX1R1DRptGohAr6i8"
          }
        ],
        album: {
          id: "3n5fuZto8ne8LJV56oPU8q",
          name: "Some Boring, Love Stories",
          image: "https://i.scdn.co/image/ab67616d0000b2738bb2b5f766a9bac4496a584e",
          url: "https://open.spotify.com/track/72542euQT9wECESPCIKSXS"
        }
      },
      {
        id: "57kwHsfbo2MEdXeeKXXMlq",
        name: "Flourishing",
        url: "https://open.spotify.com/track/57kwHsfbo2MEdXeeKXXMlq",
        artists: [
          {
            id: "4Q10j25ITsKQZ1tGd7g8N4",
            name: "Off the Jump",
            url: "https://open.spotify.com/artist/4Q10j25ITsKQZ1tGd7g8N4"
          }
        ],
        album: {
          id: "0KqGooA0diXMBHJhxCaApu",
          name: "High Beams",
          image: "https://i.scdn.co/image/ab67616d0000b2737b2b2ab45c9e054c2c4c6093",
          url: "https://open.spotify.com/track/57kwHsfbo2MEdXeeKXXMlq"
        }
      },
      {
        id: "25yup6WYnPoITrfzhkBLmt",
        name: "I Can't Sleep",
        url: "https://open.spotify.com/track/25yup6WYnPoITrfzhkBLmt",
        artists: [
          {
            id: "6bmlMHgSheBauioMgKv2tn",
            name: "Powfu",
            url: "https://open.spotify.com/artist/6bmlMHgSheBauioMgKv2tn"
          },
          {
            id: "1bq8rqNnfrojn0OSAfeNXJ",
            name: "Sarcastic Sounds",
            url: "https://open.spotify.com/artist/1bq8rqNnfrojn0OSAfeNXJ"
          }
        ],
        album: {
          id: "3n5fuZto8ne8LJV56oPU8q",
          name: "Some Boring, Love Stories",
          image: "https://i.scdn.co/image/ab67616d0000b2738bb2b5f766a9bac4496a584e",
          url: "https://open.spotify.com/track/25yup6WYnPoITrfzhkBLmt"
        }
      },
      {
        id: "6JSNx1XNeA96BwootZVi7f",
        name: "Memories with Her",
        url: "https://open.spotify.com/track/6JSNx1XNeA96BwootZVi7f",
        artists: [
          {
            id: "3VcaBezSFVJHqylrhaYun2",
            name: "Kudasaibeats",
            url: "https://open.spotify.com/artist/3VcaBezSFVJHqylrhaYun2"
          }
        ],
        album: {
          id: "7oAey0GMlhl0lS7TjiIHpQ",
          name: "Falling",
          image: "https://i.scdn.co/image/ab67616d0000b273ef4ad54571b3e9bc1bd0b6a8",
          url: "https://open.spotify.com/track/6JSNx1XNeA96BwootZVi7f"
        }
      },
      {
        id: "0TK2YIli7K1leLovkQiNik",
        name: "Señorita",
        url: "https://open.spotify.com/track/0TK2YIli7K1leLovkQiNik",
        artists: [
          {
            id: "7n2wHs1TKAczGzO7Dd2rGr",
            name: "Shawn Mendes",
            url: "https://open.spotify.com/artist/7n2wHs1TKAczGzO7Dd2rGr"
          },
          {
            id: "4nDoRrQiYLoBzwC5BhVJzF",
            name: "Camila Cabello",
            url: "https://open.spotify.com/artist/4nDoRrQiYLoBzwC5BhVJzF"
          }
        ],
        album: {
          id: "2ZaX1FdZCwchXl1QZiD4O4",
          name: "Señorita",
          image: "https://i.scdn.co/image/ab67616d0000b273e6095c382c2853667c1623eb",
          url: "https://open.spotify.com/track/0TK2YIli7K1leLovkQiNik"
        }
      },
      {
        id: "5g07At8Eoq3yGXe3TG2FAA",
        name: "Tone",
        url: "https://open.spotify.com/track/5g07At8Eoq3yGXe3TG2FAA",
        artists: [
          {
            id: "4Q10j25ITsKQZ1tGd7g8N4",
            name: "Off the Jump",
            url: "https://open.spotify.com/artist/4Q10j25ITsKQZ1tGd7g8N4"
          }
        ],
        album: {
          id: "0kjvD4eRBdxro3JKz5cOXL",
          name: "Tone",
          image: "https://i.scdn.co/image/ab67616d0000b273ed4463d8c5bb91968027a143",
          url: "https://open.spotify.com/track/5g07At8Eoq3yGXe3TG2FAA"
        }
      },
      {
        id: "0vW4wJzJysVrDXEM0rWQ3v",
        name: "i was ill, but i think i'm ok now",
        url: "https://open.spotify.com/track/0vW4wJzJysVrDXEM0rWQ3v",
        artists: [
          {
            id: "5LCmX0zahE0VcaMNHxLJqm",
            name: "athena",
            url: "https://open.spotify.com/artist/5LCmX0zahE0VcaMNHxLJqm"
          }
        ],
        album: {
          id: "5csc7VlJbT7Xjz6tGQ8nmS",
          name: "17",
          image: "https://i.scdn.co/image/ab67616d0000b2738aa0d134cab05ab03b78bacd",
          url: "https://open.spotify.com/track/0vW4wJzJysVrDXEM0rWQ3v"
        }
      },
      {
        id: "2CwcZrIqfmC18Uj30nGnyp",
        name: "Snow",
        url: "https://open.spotify.com/track/2CwcZrIqfmC18Uj30nGnyp",
        artists: [
          {
            id: "2bkf2PmiVyfCqg2uzIFIqJ",
            name: "Jetson",
            url: "https://open.spotify.com/artist/2bkf2PmiVyfCqg2uzIFIqJ"
          }
        ],
        album: {
          id: "5GW2y2HTvJjIBOFLAEmKB0",
          name: "Snow",
          image: "https://i.scdn.co/image/ab67616d0000b273475f00b308c41f92e07458b3",
          url: "https://open.spotify.com/track/2CwcZrIqfmC18Uj30nGnyp"
        }
      },
      {
        id: "1wUbCrxRjitJnVOOMZOUkP",
        name: "Need a Girl Like Shego...",
        url: "https://open.spotify.com/track/1wUbCrxRjitJnVOOMZOUkP",
        artists: [
          {
            id: "5LCmX0zahE0VcaMNHxLJqm",
            name: "athena",
            url: "https://open.spotify.com/artist/5LCmX0zahE0VcaMNHxLJqm"
          }
        ],
        album: {
          id: "7LzN4JAabaPd0ORJ1oEynQ",
          name: "'17",
          image: "https://i.scdn.co/image/ab67616d0000b273ae3c2ad8e77f31082f9732bd",
          url: "https://open.spotify.com/track/1wUbCrxRjitJnVOOMZOUkP"
        }
      },
      {
        id: "70gHywxuYi47GCDBIcbsuG",
        name: "Implants",
        url: "https://open.spotify.com/track/70gHywxuYi47GCDBIcbsuG",
        artists: [
          {
            id: "7wSr4otUV4ytUvHE4w3rBe",
            name: "Hovey Benjamin",
            url: "https://open.spotify.com/artist/7wSr4otUV4ytUvHE4w3rBe"
          }
        ],
        album: {
          id: "33GrAvKuLpI26P9sr1ZUsW",
          name: "Implants",
          image: "https://i.scdn.co/image/ab67616d0000b273932399e492a0445136fa9b25",
          url: "https://open.spotify.com/track/70gHywxuYi47GCDBIcbsuG"
        }
      },
      {
        id: "6E0XSQjATGxyca8Z1OgoGM",
        name: "Restoration",
        url: "https://open.spotify.com/track/6E0XSQjATGxyca8Z1OgoGM",
        artists: [
          {
            id: "60Utw3CGxdt08eHHZGJNON",
            name: "Louverture",
            url: "https://open.spotify.com/artist/60Utw3CGxdt08eHHZGJNON"
          },
          {
            id: "5iMUho98faEp2w6j5p44PH",
            name: "j'san",
            url: "https://open.spotify.com/artist/5iMUho98faEp2w6j5p44PH"
          },
          {
            id: "46NCqFl8vhQZD77y7XkvJs",
            name: "goosetaf",
            url: "https://open.spotify.com/artist/46NCqFl8vhQZD77y7XkvJs"
          }
        ],
        album: {
          id: "2PCWeGAVrQ1MD2sbrThWp5",
          name: "Restoration",
          image: "https://i.scdn.co/image/ab67616d0000b273ae68e38b6b85b382101466ee",
          url: "https://open.spotify.com/track/6E0XSQjATGxyca8Z1OgoGM"
        }
      },
      {
        id: "60SdxE8apGAxMiRrpbmLY0",
        name: "Lucky You (feat. Joyner Lucas)",
        url: "https://open.spotify.com/track/60SdxE8apGAxMiRrpbmLY0",
        artists: [
          {
            id: "7dGJo4pcD2V6oG8kP0tJRR",
            name: "Eminem",
            url: "https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR"
          },
          {
            id: "6C1ohJrd5VydigQtaGy5Wa",
            name: "Joyner Lucas",
            url: "https://open.spotify.com/artist/6C1ohJrd5VydigQtaGy5Wa"
          }
        ],
        album: {
          id: "3HNnxK7NgLXbDoxRZxNWiR",
          name: "Kamikaze",
          image: "https://i.scdn.co/image/ab67616d0000b273e4073def0c03a91e3fceaf73",
          url: "https://open.spotify.com/track/60SdxE8apGAxMiRrpbmLY0"
        }
      },
      {
        id: "7uHRKSQ9WIlBBuBY7BHcbq",
        name: "Forever",
        url: "https://open.spotify.com/track/7uHRKSQ9WIlBBuBY7BHcbq",
        artists: [
          {
            id: "4XWaILHqySwH1y6LhlYcsb",
            name: "haroinfather",
            url: "https://open.spotify.com/artist/4XWaILHqySwH1y6LhlYcsb"
          }
        ],
        album: {
          id: "6eCvWduBT4UJSYpseMSnXO",
          name: "Forever",
          image: "https://i.scdn.co/image/ab67616d0000b27349337be31c61ec60ec021fe7",
          url: "https://open.spotify.com/track/7uHRKSQ9WIlBBuBY7BHcbq"
        }
      },
      {
        id: "34A2accnIDPOhkRltN8KJY",
        name: "Call me",
        url: "https://open.spotify.com/track/34A2accnIDPOhkRltN8KJY",
        artists: [
          {
            id: "6OOxsmeDk34xk6Ok3Ap95C",
            name: "90sFlav",
            url: "https://open.spotify.com/artist/6OOxsmeDk34xk6Ok3Ap95C"
          }
        ],
        album: {
          id: "4r5Uvinx2W572g2goXL0zW",
          name: "Collection",
          image: "https://i.scdn.co/image/ab67616d0000b273f0b22473a87abf7907c258ba",
          url: "https://open.spotify.com/track/34A2accnIDPOhkRltN8KJY"
        }
      }
    ])
  }
}

export default MockIntegration
