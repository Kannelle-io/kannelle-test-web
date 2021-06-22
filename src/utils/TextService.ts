import { ANIMATION_KEYS, TEXT_LENGTHS } from '../Constants';

class TextService {
  static getDefaultTextsByAnimationAndTextLength = (animationName: string, textLength: string) => {
    switch (textLength) {
      case TEXT_LENGTHS.SMALL:
        return TextService.getShortDefaultTextsByAnimation(animationName);
      case TEXT_LENGTHS.LARGE:
        return TextService.getLongDefaultTextsByAnimation(animationName);
      case TEXT_LENGTHS.MEDIUM:
      default:
        return TextService.getMediumDefaultTextsByAnimation(animationName);
    }
  };

  static getShortDefaultTextsByAnimation = (animationName: string) => {
    switch (animationName) {
      case ANIMATION_KEYS.AUSTIN:
        return ['Actors', 'Viewers', '+23%', 'Listeners', '-63%'];
      case ANIMATION_KEYS.AVENTI:
        return ['Sugar', 'No sugar'];
      case ANIMATION_KEYS.BIRD:
        return ['Hey,', 'job?'];
      case ANIMATION_KEYS.BUTTERFLY:
        return ['5', 'MOTIVATING CONDITIONS'];
      case ANIMATION_KEYS.CITROEN:
        return ['Break', 'with', 'Emilie', 'Manager'];
      case ANIMATION_KEYS.DELOREAN:
        return ['Actors', 'Viewers', '+23%', 'Listeners', '-63%'];
      case ANIMATION_KEYS.DODGE:
        return ['$28Mds', 'is a lot', 'iSwissWeb, 2018'];
      case ANIMATION_KEYS.FORD:
        return ["T'es", 'qui ?'];
      case ANIMATION_KEYS.FOX:
        return ['5 REASONS'];
      case ANIMATION_KEYS.LIME:
        return ['Europe', 'Confessional', 'Paris', '26th May'];
      case ANIMATION_KEYS.LINCOLN:
        return ['80%', 'of people are happy', 'Paris, 2020'];
      case ANIMATION_KEYS.MAZDA:
        return ['Hobbies'];
      case ANIMATION_KEYS.MCLAREN:
        return ['$28Mds', 'is a lot', 'iSwissWeb, 2018'];
      case ANIMATION_KEYS.MUSTANG:
        return ['Mission'];
      case ANIMATION_KEYS.NISSAN:
        return ['Sophie', 'Manager'];
      case ANIMATION_KEYS.OWL:
        return ['APPLY ON', 'WWW.KANNELLE.IO'];
      case ANIMATION_KEYS.PEUGEOT:
        return ['Milk', 'Water'];
      case ANIMATION_KEYS.PLANE:
        return ['This', 'is', 'Michel', 'Developer'];
      case ANIMATION_KEYS.RAM:
        return ['2020', 'No sugar'];
      case ANIMATION_KEYS.ROUSH:
        return ['Sugar', 'No sugar'];
      case ANIMATION_KEYS.SIMCA:
        return ['What else?'];
      case ANIMATION_KEYS.SKATEBOARD:
        return ['Gossips', 'with', 'Edouard', 'Editor'];
      case ANIMATION_KEYS.TOYOTA:
        return ['80%', 'of people are happy', 'Paris, 2020'];
      case ANIMATION_KEYS.VECTOR:
        return ['2020', 'No sugar'];
      case ANIMATION_KEYS.VELIB:
      default:
        return ['Sugar', 'No sugar'];
    }
  };

  static getMediumDefaultTextsByAnimation = (animationName: string) => {
    switch (animationName) {
      case ANIMATION_KEYS.AUSTIN:
        return [
          'Main actors in the cinema',
          'Number of people who are watching movies',
          '+23%',
          'Number of people who listen to the radio',
          '-63%',
        ];
      case ANIMATION_KEYS.AVENTI:
        return ['With milk', 'Without milk'];
      case ANIMATION_KEYS.BIRD:
        return ["Hey, what's", 'your job?'];
      case ANIMATION_KEYS.BUTTERFLY:
        return ['5', 'REALLY EXCITING MOTIVATING CONDITIONS OF WORK'];
      case ANIMATION_KEYS.CITROEN:
        return ['Coffee break', 'with', 'Emilie Coudrat', 'Startups Program Manager @ Naver'];
      case ANIMATION_KEYS.DELOREAN:
        return [
          'Main actors in the cinema',
          'Number of people who are watching movies',
          '+23%',
          'Number of people who listen to the radio',
          '-63%',
        ];
      case ANIMATION_KEYS.DODGE:
        return ['$28Mds', 'is a lot of money', 'iSwissWeb, between 2019 and 2020'];
      case ANIMATION_KEYS.FORD:
        return ['Who', 'are you?'];
      case ANIMATION_KEYS.FOX:
        return ['5 REASONS WHY YOU SHOULD JOIN US'];
      case ANIMATION_KEYS.LIME:
        return ['Southern Europe', 'Confessional', 'Paris, France', '26th & 27th September 2018'];
      case ANIMATION_KEYS.LINCOLN:
        return ['80%', 'of people are really happy', 'South-east of Paris, between 2019 and 2020'];
      case ANIMATION_KEYS.MAZDA:
        return ['My hobbies: fashion & digital marketing'];
      case ANIMATION_KEYS.MCLAREN:
        return ['$28Mds', 'is a lot of money', 'iSwissWeb, between 2019 and 2020'];
      case ANIMATION_KEYS.MUSTANG:
        return ['My main mission: improve e-commerce revenue'];
      case ANIMATION_KEYS.NISSAN:
        return ['Sophie Trippé', 'E-Marketing Manager @ Zara France'];
      case ANIMATION_KEYS.OWL:
        return ['CHECK OUR SUPER JOB OFFERS ON OUR WEBSITE', 'WWW.KANNELLE.IO/ JOBS-FOR-YOU'];
      case ANIMATION_KEYS.PEUGEOT:
        return ['With milk', 'Without milk'];
      case ANIMATION_KEYS.PLANE:
        return ['In the shoes', 'of...', 'Ludovic Fauvet', 'Board member of VideoLAN'];
      case ANIMATION_KEYS.RAM:
        return ['2020', 'Without milk'];
      case ANIMATION_KEYS.ROUSH:
        return ['With milk', 'Without milk'];
      case ANIMATION_KEYS.SIMCA:
        return ['What if you were... a weakness?'];
      case ANIMATION_KEYS.SKATEBOARD:
        return ['Gossips', 'with', 'Edouard Loisel', 'Video editor at MinuteBuzz'];
      case ANIMATION_KEYS.TOYOTA:
        return ['80%', 'of people are really happy', 'South-east of Paris, between 2019 and 2020'];
      case ANIMATION_KEYS.VECTOR:
        return ['2020', 'Without milk'];
      case ANIMATION_KEYS.VELIB:
      default:
        return ['With milk', 'Without milk'];
    }
  };

  static getLongDefaultTextsByAnimation = (animationName: string) => {
    switch (animationName) {
      case ANIMATION_KEYS.AUSTIN:
        return [
          "Main actors in the independant avant-gardist post new-wave cinema of the 1950's", // chars
          'Number of people who are watching movies while cleaning the house with a blue and red mop', // 89 chars
          '+23%',
          'Number of people who listen to the radio while doing the dishes before cooking delicious vanilla cakes', // 102 chars
          '-63%',
        ];
      case ANIMATION_KEYS.AVENTI:
        return [
          'With hot milk and chocolate and small pieces of nuts and a straw', // 64 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
      case ANIMATION_KEYS.BIRD:
        return [
          "Hello you! Please tell me if it's ok for you, what's", // 52 chars
          'your amazing dream job you would like to have in your amazing life?',
        ]; // 67 chars
      case ANIMATION_KEYS.BUTTERFLY:
        return [
          '5',
          'REALLY EXCITING MOTIVATING CONDITIONS OF WORK WHERE YOU CAN ALSO EAT COOKIES AND DRINK HOT CHOCOLATE WHEN YOU WANT WHERE YOU WANT',
        ]; // 129 chars
      case ANIMATION_KEYS.CITROEN:
        return [
          'Coffee break in the morning between 8 AM and 11 AM on a cloudy day', // 66 chars
          'in the amazing presence of',
          'Mr Bidule Chouette von Paris',
          'Unicorn Startups Program and People Manager @ A very big company',
        ]; // 64 chars
      case ANIMATION_KEYS.DELOREAN:
        return [
          "Main actors in the independant avant-gardist post new-wave cinema of the 1950's", // chars
          'Number of people who are watching movies while cleaning the house with a blue and red mop', // 89 chars
          '+23%',
          'Number of people who listen to the radio while doing the dishes before cooking delicious vanilla cakes', // 102 chars
          '-63%',
        ];
      case ANIMATION_KEYS.DODGE:
        return [
          '$28Mds', // 6 chars
          'is a pretty big amount of money compared to not so much of money which is still some money', // 90 chars
          'A source like iSwissWeb but not totally iSwissWeb, between the summer of 2019 and the winter of 2020',
        ]; // 100 chars
      case ANIMATION_KEYS.FORD:
        return [
          'Would you like to tell me what you want, what you really really want', // 68 chars
          'to become  in the future and who you are now?',
        ]; // 45 chars
      case ANIMATION_KEYS.FOX:
        return [
          '5 REALLY GOOD REASONS TO JOIN OUR AMAZING COMPANY WHERE EVERYONE IS FEELING GREAT AGAIN BECAUSE THEY ALL LIKE TO EAT MILK CHOCOLATE',
        ]; // 131 chars
      case ANIMATION_KEYS.LIME:
        return [
          'Somewhere between East-Southern Europe and West-Northern Africa', // 63 chars
          'Confessional where you can say anything you like except bad bad words', // 69 chars
          'Äteritsiputeritsipuolilautatsijänkä, Finland',
          'From 26th to 28th September of the wonderful and historic year 2018',
        ]; // 67 chars
      case ANIMATION_KEYS.LINCOLN:
        return [
          '80%', // 3 chars
          'of people are in a permanent state of general euphoria, otherwise life would not be as funny.', // 93 chars
          '15th arrondissement of Paris, from the start of 2019 until the end of 2020',
        ]; // 74 chars
      case ANIMATION_KEYS.MAZDA:
        return ['My favorite hobbies: pilot very big starships and collect coins']; // 63 chars
      case ANIMATION_KEYS.MCLAREN:
        return [
          '$28Mds', // 6 chars
          'is a pretty big amount of money compared to not so much of money which is still some money', // 90 chars
          'A source like iSwissWeb but not totally iSwissWeb, between the summer of 2019 and the winter of 2020',
        ]; // 100 chars
      case ANIMATION_KEYS.MUSTANG:
        return ['My main mission: bring hope, joy and emotions to people who need it']; // 67 chars
      case ANIMATION_KEYS.NISSAN:
        return [
          'Oswald Chesterfield Cobblepot Aka The Penguin who likes umbrellas', // 65 chars
          'Full-time enemy of Batman in the movie Batman Returns which is OK',
        ]; // 65 chars
      case ANIMATION_KEYS.OWL:
        return [
          'CHECK OUR SUPER GREAT JOB OFFERS WHERE YOU WILL BECOME A BETTER PERSON ON OUR WEBSITE', // 85 chars
          'WWW.KANNELLE-IS-THE-BEST-COMPANY-TO-JOIN.IO/ JOBS-FOR-YOU',
        ]; // 57 chars
      case ANIMATION_KEYS.PEUGEOT:
        return [
          'With hot milk and chocolate and small pieces of nuts and a straw', // 64 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
      case ANIMATION_KEYS.PLANE:
        return [
          'In the wonderful and bright and shiny and sweet black and white shoes', // 69 chars
          'of the amazing person named... wait for it... not done yet... ah...', // 67 chars
          'Hubert Bonisseur de La Bath in the terrific movies OSS 117', // 58 chars
          'The best secret agent of the universe, who likes Nespresso coffee too',
        ]; // 69 chars
      case ANIMATION_KEYS.RAM:
        return [
          '2020 With hot milk and chocolate and small pieces of nuts and a straw', // 69 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
      case ANIMATION_KEYS.ROUSH:
        return [
          'With hot milk and chocolate and small pieces of nuts and a straw', // 64 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
      case ANIMATION_KEYS.SIMCA:
        return ['What whould happen if you were... a dinosaur who likes lollipops?']; // 65 chars
      case ANIMATION_KEYS.SKATEBOARD:
        return [
          'Noisy, disturbing but very nice and appreciable gossips', // 55 chars
          'with, Ladies and gentlemen, someone you were all waiting for...', // 63 chars
          'Barnabé-Guy-Octave de Fleury-Mombreuse du Pantel de Saint-Amant',
          'Maybe the most prestigious actor of all time if not of the universe',
        ]; // 67 chars
      case ANIMATION_KEYS.TOYOTA:
        return [
          '80%', // 3 chars
          'of people are in a permanent state of general euphoria, otherwise life would not be as funny.', // 93 chars
          '15th arrondissement of Paris, from the start of 2019 until the end of 2020',
        ]; // 74 chars
      case ANIMATION_KEYS.VECTOR:
        return [
          '2020 With hot milk and chocolate and small pieces of nuts and a straw', // 69 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
      case ANIMATION_KEYS.VELIB:
      default:
        return [
          'With hot milk and chocolate and small pieces of nuts and a straw', // 64 chars
          'Without cold milk and jellybean and black and white Oreo cookies',
        ]; // 64 chars
    }
  };
}

export default TextService;
