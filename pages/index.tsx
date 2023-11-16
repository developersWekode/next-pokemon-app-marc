import { pokeApi } from '../api';
import { Layout } from '@/components/layouts';
import { PokemonListResponde, SmallPokemon } from '../interfaces';
import { GetStaticProps, NextPage } from 'next';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
  
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Lista de Pokemons'>
      <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
       {
          pokemons.map(( pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </div>   
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponde>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  };
}

export default HomePage;

